"use client";

import { SafeUser } from "@/app/types";
import Button from "@/components/Button";
import ImageUpload from "@/components/inputs/ImageUpload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface PreferencesClientProps {
  currentUser: SafeUser;
}

const PreferencesClient: FC<PreferencesClientProps> = ({ currentUser }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      image: currentUser?.image,
      name: currentUser?.name,
    },
  });
  const image = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.name === currentUser?.name && data.image === currentUser?.image) {
      toast.error("You have not made any changes.");
      return;
    }

    axios
      .put("/api/user", {
        ...data,
        userId: currentUser?.id,
      })
      .then(() => {
        toast.success("Updated Changes");
        router.push("/profile/dashboard");
        router.refresh();
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="my-6 flex w-full flex-col gap-4 rounded-md px-4 py-6 shadow-[0px_0px_20px_10px_rgba(0,0,0,0.1)]">
      <div className="mx-auto">
        <ImageUpload
          onChange={(value) => setCustomValue("image", value)}
          value={image}
          className="p-12"
          rounded="rounded-lg"
        />
      </div>

      {/* name input */}
      <div className="relative w-full">
        <input
          id="name"
          type="text"
          defaultValue={currentUser.name as string}
          placeholder=" "
          className={`peer w-full rounded-md border-2 px-4 py-3`}
          required
          {...register("name")}
        />
        <label
          className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
        >
          Author Name
        </label>
      </div>
      <div className="space-y-2">
        <Button onClick={handleSubmit(onSubmit)} label="Save Changes" small />
        <Button onClick={() => router.back()} label="Back" outline small />
      </div>
    </div>
  );
};

export default PreferencesClient;
