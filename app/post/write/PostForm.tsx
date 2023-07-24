"use client";

import PostGeneration from "./PostGeneration";
import { FC, useState } from "react";
import MultiSelect from "./MultiSelect";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { SelectOption } from "./SingleSelect";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TitleInput from "./TitleInput";
import { SafePost, SafeUser } from "@/app/types";
import getPostTemplate from "@/app/actions/openai/generatePostTemplate";
import { motion } from "framer-motion";
import PostPreview from "./PostPreview";
import ImageUpload from "@/components/inputs/ImageUpload";
import Button from "@/components/Button";
import PostInput from "@/components/inputs/PostInput";
import Loader from "@/components/Loader";

interface PostFormProps {
  currentUser: SafeUser | null;
  post?: SafePost | null;
}

export const options = [
  { label: "Technology", value: "technology" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Home", value: "home" },
  { label: "Health", value: "health" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Gaming", value: "gaming" },
  { label: "Movies", value: "movies" },
  { label: "Anime", value: "anime" },
  { label: "Fashion", value: "fashion" },
  { label: "Fitness", value: "fitness" },
  { label: "Sports", value: "sports" },
  { label: "Business", value: "business" },
  { label: "Art", value: "art" },
  { label: "Science", value: "science" },
  { label: "Education", value: "education" },
  { label: "News", value: "news" },
];

const PostForm: FC<PostFormProps> = ({ post }) => {
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [postTags, setPostTags] = useState<SelectOption[]>(
    post
      ? post.tags.map((tag) => ({ label: tag, value: tag.toLowerCase() }))
      : []
  );

  const [generatedContent, setGeneratedContent] = useState("");
  const router = useRouter();

  const handleGenerate = async (title: string) => {
    if (title.replaceAll(" ", "").length < 10) {
      toast.error("Please come up with a longer title.");
    } else {
      setIsGenerating(true);
      const data = await getPostTemplate(title);
      setGeneratedContent(data.content);
      setIsGenerating(false);
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
      imgSrc: post?.image || "",
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      tags: [],
      published: post?.published || false,
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

  const onUpdate: SubmitHandler<FieldValues> = (data) => {
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
      .put(`/api/post/update/${post?.id}`, {
        ...data,
        slug: slugify(data.title),
        tags: postTags.map((tag) => tag.label),
      })
      .then(() => {
        toast.success("Updated Post!");
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
  const content = watch("content");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 0.75 } }}
      className="flex w-full max-w-[1280px] flex-col gap-4 rounded-md sm:border sm:px-4 sm:py-6 sm:shadow-lg"
    >
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
          className="px-32 py-20 sm:px-44 sm:py-28 md:px-56 md:py-36 lg:px-80 lg:py-48"
        />
      </div>

      {/* Tags */}
      <MultiSelect
        options={options}
        value={postTags}
        onChange={(tag) => setPostTags(tag)}
      />

      <p className="-mt-3 text-sm text-neutral-600">
        *Tip: Select the most relevant tag as the first.
      </p>

      {/* Generate template prompt */}
      <PostGeneration
        isLoading={isGenerating}
        generatedContent={generatedContent}
        handleGenerate={() => handleGenerate(title)}
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setPreview(false)}
          className={`w-36 border-2 border-zinc-800 p-1 shadow-md transition duration-200 hover:bg-zinc-800 hover:text-white ${
            preview
              ? "hover:-translate-y-1 hover:bg-zinc-800 hover:text-white"
              : "bg-zinc-800 text-white hover:opacity-80"
          }
          `}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setPreview(true)}
          className={`w-36 border-2 border-zinc-800 p-1 shadow-md transition duration-200 ${
            !preview
              ? "hover:-translate-y-1 hover:bg-zinc-800 hover:text-white"
              : "bg-zinc-800 text-white hover:opacity-80"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Post Content */}
      {preview ? (
        <PostPreview content={content} />
      ) : (
        <PostInput
          id="content"
          errors={errors}
          placeholder="Post Content"
          register={register}
          required
          disabled={isLoading}
          className={`duration-300 focus:shadow-lg md:text-lg lg:text-xl`}
        />
      )}

      {/* Buttons */}
      {post ? (
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-12">
          <Button onClick={() => router.back()} outline label="Back" />
          <Button onClick={handleSubmit(onUpdate)} label="Update" />
        </div>
      ) : (
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
      )}
    </motion.form>
  );
};

export default PostForm;
