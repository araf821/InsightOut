"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import PostInput from "@/app/components/inputs/PostInput";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Select from "react-select";

const WritePage = () => {
  const [selected, setSelected] = useState("");

  const handleChange = (selectedOption: any) => {
    setSelected(selectedOption.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      imgSrc: "",
      title: "",
      content: "",
      category: selected,
    },
  });

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
      <Heading title="Uncover A New Insight" center />
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
          <Select
            className="w-full"
            options={options}
            onChange={handleChange}
          />
        </section>
        <div className="flex w-full max-w-[950px] flex-col items-center justify-between gap-4 sm:flex-row sm:gap-12 md:gap-32 lg:gap-52 xl:gap-64">
          <Button label="Save to Drafts" onClick={() => {}} outline />
          <Button label="Publish" onClick={() => {}} />
        </div>
      </div>
    </Container>
  );
};
export default WritePage;
