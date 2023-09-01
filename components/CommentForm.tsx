"use client";

import { validInputPattern } from "@/app/post/write/PostForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Avatar from "./Avatar";
import Button from "./Button";
import { SafeUser } from "@/types";

interface CommentFormProps {
  currentUser: SafeUser;
  onSubmit: (data: z.infer<typeof commentSchema>) => void;
}

const commentSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be between 3 to 252 characters long." })
    .max(252, { message: "Comment must be between 3 to 252 characters long." })
    .refine((value) => validInputPattern.test(value), {
      message: "Title can only contain letters, digits, and spaces.",
    }),
});

const CommentForm: FC<CommentFormProps> = ({ currentUser, onSubmit }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    form.reset();
    setOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmit]);

  const isLoading = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      {...form}
      className="flex flex-col gap-2"
    >
      <div className="flex gap-x-2.5">
        <Avatar src={currentUser.image} classNames="w-8 md:w-12" />
        <div className="w-full">
          <textarea
            onFocus={() => setOpen(true)}
            className="w-full resize-none rounded-md border-2 border-zinc-300 px-1 py-1.5 outline-none focus:border-zinc-800"
            disabled={isLoading}
            rows={open ? 3 : 1}
            placeholder="Add a comment..."
            {...form.register("comment")}
          />
          {form.formState.errors && open && (
            <p className="-mt-1.5 mb-2 text-sm text-rose-500">
              {form.formState.errors.comment?.message}
            </p>
          )}
          {open ? (
            <div className="flex justify-end gap-x-2">
              <Button
                className="max-w-[175px]"
                outline
                small
                onClick={() => {
                  setOpen(false);
                }}
                label="Cancel"
              />
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="max-w-[250px]"
                small
                label="Submit"
              />
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
