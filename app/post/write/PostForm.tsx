"use client";

import { z } from "zod";
import PostGeneration from "./PostGeneration";
import { FC, useState } from "react";
import MultiSelect from "./MultiSelect";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TitleInput from "./TitleInput";
import { SafePost, SafeUser } from "@/types";
import { motion } from "framer-motion";
import PostPreview from "./PostPreview";
import ImageUpload from "@/components/inputs/ImageUpload";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import ContentInput from "./ContentInput";
import Disclaimer from "@/app/contact/Disclaimer";
import { options } from "@/constants/constants";

interface PostFormProps {
  currentUser: SafeUser | null;
  post?: SafePost | null;
}

export const validInputPattern = /^[A-Za-z0-9\s"'\-:/$@#*()<>{}]*$/; // Only allow letters, numbers and spaces

export const postSchema = z.object({
  title: z
    .string()
    .min(6, { message: "Title must be at least 6 characters long." })
    .max(100, { message: "Title can be at most 100 characters long." })
    .refine((value) => validInputPattern.test(value), {
      message: "Title can only contain letters, digits, and spaces.",
    }),
  slug: z.string(),
  content: z
    .string()
    .min(500, { message: "Content must be at least 500 characters long." })
    .max(5000, {
      message: "Content must be between 500 and 5000 characters long.",
    }),
  imgSrc: z.string().url({ message: "Invalid image URL." }),
  tags: z
    .array(z.string())
    .min(1, { message: "Post must have at least one tag." }),

  published: z.boolean(),
});

const PostForm: FC<PostFormProps> = ({ post }) => {
  const [preview, setPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postTags, setPostTags] = useState<string[]>(
    post ? post.tags.map((tag) => tag) : []
  );

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
      imgSrc: post?.image || "",
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      tags: [],
      published: post?.published || false,
    },
  });

  const onPublish: SubmitHandler<FieldValues> = (data) => {
    data.tags = postTags;

    try {
      const validatedData = postSchema.parse(data);

      // If validation is successful, proceed with publishing
      setIsLoading(true);

      axios
        .post("/api/post/post", {
          ...validatedData,
          slug: slugify(validatedData.title),
          published: true,
        })
        .then(() => {
          toast.success("Post published!");
          router.push("/explore");
          reset();
        })
        .catch((error) => {
          if (error) {
            toast.error(
              "You're writing too many posts! Please wait and try again later."
            );
          } else {
            toast.error("Something went wrong.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Handle zod errors
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } pointer-events-auto rounded-lg border-2 border-accent bg-bg px-2 py-1 text-zinc-900 shadow-lg`}
            >
              {error.errors.map((err: any, index: number) => (
                <p
                  className={`my-1 py-1 ${
                    index === 0 ? "" : "border-t-2 border-red-400"
                  }`}
                  key={index}
                >
                  {err.message}
                </p>
              ))}
            </div>
          ),
          { duration: 2000 }
        );
      } else {
        // Handle other types of errors
        toast.error("Something went wrong.");
      }
    }
  };

  const onDraft: SubmitHandler<FieldValues> = (data) => {
    data.tags = postTags;

    try {
      const validatedData = postSchema.parse(data);

      // If validation is successful, proceed with publishing
      setIsLoading(true);

      axios
        .post("/api/post/post", {
          ...validatedData,
          slug: slugify(validatedData.title),
          published: false,
        })
        .then(() => {
          toast.success("Post published!");
          router.push("/explore");
          reset();
        })
        .catch((error) => {
          if (error) {
            toast.error(
              "You're writing too many posts! Please wait and try again later."
            );
          } else {
            toast.error("Something went wrong.");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Handle zod errors
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } pointer-events-auto rounded-lg border-2 border-accent bg-bg px-2 py-1 text-zinc-900 shadow-lg`}
            >
              {error.errors.map((err: any, index: number) => (
                <p
                  className={`my-1 py-1 ${
                    index === 0 ? "" : "border-t-2 border-red-400"
                  }`}
                  key={index}
                >
                  {err.message}
                </p>
              ))}
            </div>
          ),
          { duration: 2000 }
        );
      } else {
        // Handle other types of errors
        toast.error("Something went wrong.");
      }
    }
  };

  const onUpdate: SubmitHandler<FieldValues> = (data) => {
    data.tags = postTags;

    try {
      const validatedData = postSchema.parse(data);

      // If validation is successful, proceed with publishing
      setIsLoading(true);

      axios
        .put(`/api/post/update/${post?.id}`, {
          ...validatedData,
          slug: slugify(validatedData.title),
        })
        .then(() => {
          toast.success("Updated Post!");
          router.back();
          reset();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Handle zod errors
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } pointer-events-auto rounded-lg border-2 border-accent bg-bg px-2 py-1 text-zinc-900 shadow-lg`}
            >
              {error.errors.map((err: any, index: number) => (
                <p
                  className={`my-1 py-1 ${
                    index === 0 ? "" : "border-t-2 border-red-400"
                  }`}
                  key={index}
                >
                  {err.message}
                </p>
              ))}
            </div>
          ),
          { duration: 2000 }
        );
      } else {
        // Handle other types of errors
        toast.error("Something went wrong.");
      }
    }
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
      className="mx-auto flex h-fit w-full max-w-[950px] flex-shrink flex-col gap-4 rounded-md sm:border sm:px-4 sm:py-6 sm:shadow-lg"
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

      <p className="-mt-3 rounded-md border border-zinc-300 p-1.5 text-xs text-neutral-600 shadow-sm sm:text-xs">
        *Tip: Select the most relevant tag first.
      </p>

      {/* Generate template prompt */}
      <PostGeneration title={title} />

      <div className="flex gap-2">
        <button
          aria-label="hide preview"
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
          aria-label="show preview"
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
        <ContentInput
          id="content"
          errors={errors}
          placeholder="### Markdown is supported"
          register={register}
          required
          disabled={isLoading}
          className={`duration-300 focus:shadow-lg md:text-lg lg:text-xl`}
        />
      )}

      <Disclaimer
        title="Disclaimer"
        content="> You can publish/draft up to two posts per hour."
      />
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
