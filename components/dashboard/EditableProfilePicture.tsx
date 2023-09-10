import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ImageUpload from "../inputs/ImageUpload";
import { z } from "zod";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditableProfilePictureProps {
  userId: string;
  imageUrl: string;
}

const imageSchema = z.object({
  image: z.string().min(5, { message: "Valid image url is required" }),
});

const EditableProfilePicture: FC<EditableProfilePictureProps> = ({
  imageUrl,
  userId,
}) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: "",
    },
  });

  const image = form.watch("image");

  useEffect(() => {
    if (imageUrl) {
      form.setValue("image", imageUrl);
    }
  }, [imageUrl, form]);

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values: z.infer<typeof imageSchema>) => {
    try {
      await axios.patch(`/api/user/${userId}/image`, values);

      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative aspect-square w-full sm:max-w-[200px] md:h-[200px]">
      {isLoading ? null : (
        <ImageUpload
          onChange={(value) => {
            form.setValue("image", value);
            onSubmit(form.getValues());
          }}
          value={image}
          className="h-full w-full"
        />
      )}
    </div>
  );
};

export default EditableProfilePicture;
