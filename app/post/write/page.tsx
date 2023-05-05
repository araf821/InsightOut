"use client";

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
      <div className="flex flex-col items-center justify-center gap-8 font-semibold">
        <section className="flex w-full max-w-[1250px] flex-col items-center justify-center">
          {/* Photo upload */}
          <div className="mb-8">
            <ImageUpload
              value={imgSrc}
              onChange={(value) => setCustomValue("imgSrc", value)}
            />
          </div>

          {/* Title */}
          <PostInput
            id="title"
            errors={errors}
            placeholder="Title"
            register={register}
            required
          />
        </section>
        {/* Blog title, category, content */}
        {/* <section className="w-full max-w-[1250px]">
          <div className="text-md md:text-xl font-bold my-1">
            <Input
              id="post-title"
              label="Title"
              register={register}
              errors={errors}
              required
            />
          </div>

          <div className="text-md md:text-xl my-1">
            <Input
              id="post-content"
              label="Content"
              register={register}
              errors={errors}
              required
              textArea
            />
          </div>

          <p className="text-xl md:text-2xl mt-6 mb-2">Category</p>
          <Select options={options} onChange={handleChange} />
        </section> */}
      </div>
    </Container>
  );
};
export default WritePage;
