"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const userNameSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 to 21 characters long." })
    .max(21, { message: "Name must be 3 to 21 characters long." }),
});

const ProfileSettingsModal = () => {
  const { onClose, data, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "profileSettingsModal";
  const { user } = data;

  const form = useForm({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name ?? "");
    }
  }, [user, form]);

  const isLoading = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof userNameSchema>) => {
    if (values.name.trim() === user?.name) {
      return toast("No Changes Made");
    }

    try {
      await axios.patch(`/api/user/${user?.id}/nameChange`, values);

      router.refresh();
      onClose();
    } catch (error: any) {
      console.log(error);
      if (error.message.includes("422")) {
        return toast.error("Invalid Input");
      }

      if (error.message.includes("401")) {
        return toast.error("Unauthorized");
      }

      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[60%] overflow-y-auto bg-bg px-8">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-wider text-zinc-700">
            Profile Settings
          </DialogTitle>
        </DialogHeader>
        <hr />
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* name input */}
          <div className="relative w-full">
            <input
              id="name"
              type="text"
              defaultValue={user?.name as string}
              placeholder=" "
              className={`peer w-full rounded-md border-2 px-4 py-3 outline-none focus:border-zinc-800`}
              {...form.register("name")}
            />
            <label
              className={`pointer-events-none absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
            >
              Author Name
            </label>
            {errors.name && (
              <p className="text-sm text-rose-600">{errors?.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              label="Save Changes"
              small
              disabled={isLoading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettingsModal;
