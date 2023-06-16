"use client";

import ImageUpload from "@/app/components/inputs/ImageUpload";
import { FC, useState } from "react";
import MultiSelect from "./MultiSelect";
import PostInput from "@/app/components/inputs/PostInput";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { SelectOption } from "./SingleSelect";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/app/components/Button";

interface PostFormProps {}

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
  { label: "Option 5", value: 5 },
  { label: "Option 6", value: 6 },
  { label: "Option 7", value: 7 },
  { label: "Option 8", value: 8 },
];

const PostForm: FC<PostFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postTags, setPostTags] = useState<SelectOption[]>([]);

  const router = useRouter();

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
    console.log("posting");
    setIsLoading(true);

    axios
      .post("/api/post/publish", {
        ...data,
        slug: slugify(data.title),
        published: true,
        tags: postTags,
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

  const imgSrc = watch("imgSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <form className="flex w-full max-w-[1280px] flex-col gap-4 rounded-md border px-4 py-6 shadow-lg">
      {/* Title */}
      <input
        tabIndex={4}
        id="title"
        autoCorrect="off"
        autoComplete="off"
        type="text"
        disabled={isLoading}
        maxLength={75}
        required
        {...register("title")}
        placeholder="Title"
        className={`h-12 w-full border-b-2 bg-transparent px-4 py-2 font-merri text-xl font-semibold outline-none sm:text-2xl md:text-3xl
    ${errors["title"] ? "border-red-700" : "border-neutral-300"}
    ${errors["title"] ? "focus:border-red-700" : "focus:border-zinc-800"}`}
      />

      <div className="mx-auto max-w-[700px] space-y-2 text-center">
        <ImageUpload
          value={imgSrc}
          onChange={(value) => setCustomValue("imgSrc", value)}
        />
        <p className="text-lg font-bold md:text-2xl">Upload An Image</p>
        <p className="font-bold">Or</p>
        <p className="cursor-not-allowed text-xl font-bold text-zinc-600 underline sm:text-2xl md:text-3xl">
          Import from Unsplash
        </p>
        <p className="text-sm font-light md:text-base">
          - Feature Coming Soon -
        </p>
      </div>
      {/* <ToolbarComponent /> */}

      {/* Tags */}
      <MultiSelect
        options={options}
        value={postTags}
        onChange={(tags) => setPostTags(tags)}
      />
      <PostInput
        id="content"
        errors={errors}
        placeholder="Post Content"
        register={register}
        required
        textarea
        disabled={isLoading}
        className={`font-ubuntu sm:text-lg md:text-xl lg:text-2xl`}
      />

      {/* Buttons */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-12">
        <Button
          onClick={() => {}}
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
