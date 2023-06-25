"use client";

import Button from "@/app/components/Button";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";

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

  return (
    <div className="my-6 flex w-full flex-col gap-4 rounded-md px-4 py-6 shadow-[0px_0px_20px_10px_rgba(0,0,0,0.1)]">
      <div className="mx-auto">
        <ImageUpload onChange={() => {}} value={image} className="p-12" />
      </div>

      {/* name input */}
      <div className="relative w-full">
        <input
          type="text"
          defaultValue={currentUser.name as string}
          placeholder=" "
          className="peer w-full rounded-md border-2 border-neutral-400 px-4 py-3"
          required
        />
        <label className="absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800">
          Author Name
        </label>
      </div>

      <Button onClick={() => {}} label="Save Changes" small />
    </div>
  );
};

export default PreferencesClient;
