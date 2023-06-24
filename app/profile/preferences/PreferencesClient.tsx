"use client";

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
    <div className="my-6 flex h-96 w-full flex-col gap-4 rounded-md px-4 py-4 shadow-[0px_0px_20px_10px_rgba(0,0,0,0.1)]">
      <Input
        errors={errors}
        register={register}
        id="author_name"
        label="Author Name"
      />
    </div>
  );
};

export default PreferencesClient;
