"use client";

import PostGeneration from "./PostGeneration";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import { FC, useEffect, useState } from "react";
import MultiSelect from "./MultiSelect";
import PostInput from "@/app/components/inputs/PostInput";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { SelectOption } from "./SingleSelect";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import TitleInput from "./TitleInput";
import { SafeUser } from "@/app/types";
import getPostTemplate from "@/app/actions/openai/generatePostTemplate";

interface PostFormProps {
  currentUser: SafeUser | null;
}

const options = [
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Anime", value: "anime" },
  { label: "Gaming", value: "gaming" },
  { label: "Movies", value: "movies" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Fashion", value: "fashion" },
  { label: "Fitness", value: "fitness" },
  { label: "Sports", value: "sports" },
  { label: "Business", value: "business" },
  { label: "Art", value: "art" },
  { label: "Science", value: "science" },
  { label: "Lifestyle", value: "lifestyle" },
];

const PostForm: FC<PostFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postTags, setPostTags] = useState<SelectOption[]>([]);
  const [generatedContent, setGeneratedContent] = useState("");

  const router = useRouter();

  const handleGenerate = async (title: string) => {
    if (title === "") {
      toast.error("You literally didn't come up with a title yet.");
    } else {
      setIsLoading(true);
      const data = await getPostTemplate(title);
      setGeneratedContent(data.content);
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      imgSrc: "",
      title: "",
      content: "",
      slug: "",
      tags: [],
      published: false,
    },
  });

  const onPublish: SubmitHandler<FieldValues> = (data) => {
    if (imgSrc === "") {
      toast.error("You better add an image!");
      return;
    }

    if (postTags.length < 1) {
      toast.error("WHERE ARE THE TAGS?!");
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/post/post", {
        ...data,
        slug: slugify(data.title),
        published: true,
        tags: postTags.map((tag) => tag.label),
      })
      .then(() => {
        toast.success("Post published!");
        router.push("/explore");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDraft: SubmitHandler<FieldValues> = (data) => {
    if (imgSrc === "") {
      toast.error("You better add an image!");
      return;
    }

    if (postTags.length < 1) {
      toast.error("WHERE ARE THE TAGS?!");
      return;
    }

    setIsLoading(true);

    axios
      .post("/api/post/post", {
        ...data,
        slug: slugify(data.title),
        tags: postTags.map((tag) => tag.label),
      })
      .then(() => {
        toast.success("Saved as draft!");
        router.push("/profile/dashboard");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const imgSrc = watch("imgSrc");
  const title = watch("title");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setValue("content", generatedContent);
  }, [generatedContent, setValue]);

  return (
    <form className="flex w-full max-w-[1280px] flex-col gap-4 rounded-md sm:border sm:px-4 sm:py-6 sm:shadow-lg">
      {/* Title */}
      <TitleInput
        id="title"
        errors={errors}
        register={register}
        disabled={isLoading}
        required
      />

      <div className="mx-auto max-w-[700px] space-y-2 text-center">
        <ImageUpload
          value={imgSrc}
          onChange={(value) => setCustomValue("imgSrc", value)}
        />
      </div>
      {/* <ToolbarComponent /> */}

      {/* Tags */}
      <MultiSelect
        options={options}
        value={postTags}
        onChange={(tag) => setPostTags(tag)}
      />

      {/* Generate template prompt */}
      <PostGeneration
        isLoading={isLoading}
        generatedContent={generatedContent}
        handleGenerate={() => handleGenerate(title)}
      />

      {/* Post Content */}
      <PostInput
        id="content"
        errors={errors}
        placeholder="Post Content"
        register={register}
        required
        disabled={isLoading}
        className={`font-ubuntu md:text-lg lg:text-xl`}
      />

      {/* Buttons */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-12">
        <Button
          onClick={handleSubmit(onDraft)}
          label="Save As Draft"
          outline
          className="md:max-w-[400px]"
        />
        <Button
          onClick={handleSubmit(onPublish)}
          label="Publish Post"
          className="md:max-w-[400px]"
        />
      </div>
    </form>
  );
};

export default PostForm;
