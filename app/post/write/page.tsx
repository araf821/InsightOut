"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import PostInput from "@/app/components/inputs/PostInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Select from "react-select";
import slugify from "slugify";

const WritePage = () => {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (selectedOption: any) => {
    setSelected(selectedOption.value);
    console.log(selected);
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
      imgSrc: "",
      title: "",
      content: "",
      slug: "",
      category: "",
      published: false,
    },
  });

  const onPublish: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/post/publish", {
        ...data,
        slug: slugify(data.title),
        published: true,
        category: selected,
      })
      .then(() => {
        toast.success("Insight published!");
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

  const options = [
    { value: "home", label: "Home" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "fitness", label: "Fitness" },
    { value: "news", label: "News" },
    { value: "entertainment", label: "Entertainment" },
    { value: "careers", label: "Careers" },
    { value: "food", label: "Food" },
  ];

  return (
    <Container>
      <Heading title="Give Us A New Insight" center />
      <div className="mb-8 flex flex-col items-center justify-center gap-8 font-semibold">
        <section className="flex w-full max-w-[945px] flex-col items-center justify-center gap-8">
          {/* Photo upload */}
          <ImageUpload
            value={imgSrc}
            onChange={(value) => setCustomValue("imgSrc", value)}
          />

          {/* Title */}
          <PostInput
            id="title"
            errors={errors}
            placeholder="Title"
            register={register}
            required
          />

          <PostInput
            id="content"
            errors={errors}
            placeholder="Post Content"
            register={register}
            required
            textarea
          />
          <div className="flex w-full flex-col gap-2">
            <p className="text-center tracking-wider">Category</p>
            <Select
              className="w-full"
              options={options}
              onChange={handleChange}
            />
          </div>
        </section>
        <div className="flex w-full max-w-[950px] flex-col items-center justify-between gap-4 sm:flex-row sm:gap-20 md:gap-44 lg:gap-64 xl:gap-80">
          <Button label="Save to Drafts" onClick={() => {}} outline />
          <Button label="Publish" onClick={handleSubmit(onPublish)} />
        </div>
      </div>
    </Container>
  );
};
export default WritePage;
