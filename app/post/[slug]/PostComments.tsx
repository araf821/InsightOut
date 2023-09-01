"use client";

import CommentInput from "@/components/comments/CommentInput";
import { SafeUser } from "@/types";
import { Comment } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { validInputPattern } from "../write/PostForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PostCommentsProps {
  currentUser: SafeUser | null;
  postId: string;
  comments: Comment[];
}

const formSchema = z.object({
  comment: z
    .string()
    .min(3, { message: "Comment must be between 3 to 252 characters long." })
    .max(252, { message: "Comment must be between 3 to 252 characters long." })
    .refine((value) => validInputPattern.test(value), {
      message: "Title can only contain letters, digits, and spaces.",
    }),
});

const PostComments = ({ currentUser, postId, comments }: PostCommentsProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast("hello")
    try {
      await axios.post(`/api/comments/${postId}`, data);

      form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast("failed")
    }
  };

  //   const { mutate: postComment } = useMutation({
  //     mutationFn: async (values: z.infer<typeof formSchema>) => {
  //       const { data } = await axios.post(`/api/comments/${postId}`, values);

  //       return data;
  //     },
  //     onError: (err: Error) => {
  //       return toast.error(err.message);
  //     },
  //     onSuccess: () => {
  //       toast.success("Comment posted successfully!");
  //       setOpen(false);
  //       router.refresh();
  //     },
  //   });

  return (
    <div className="mx-auto mb-6 mt-2 flex max-w-[950px] flex-col gap-4">
      {/* Comment Input Section */}
      {currentUser ? (
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
                    label="Post Comment"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </form>
      ) : null}

      {/* Displaying Comments */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
