"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
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
  } = useForm<FieldValues>({
    defaultValues: {
      imgSrc: "",
      title: "",
      content: "",
      category: selected,
    },
  });

  const options = [
    { value: "home", label: "Home" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "fitness", label: "Fitness" },
    { value: "news", label: "News" },
    { value: "entertainment", label: "Entertainment" },
    { value: "careers", label: "Careers" },
  ];

  return (
    <Container>
      <Heading title="Uncover A New Insight" center />
      <div className="flex flex-col justify-center items-center gap-8 font-semibold">
        {/* Photo upload */}
        <section className="w-full max-w-[1250px]">
          <p className="text-xl md:text-3xl">
            Add a photo relevant to your post.
          </p>
          <div>
            <ImageUpload />
          </div>
        </section>

        {/* Blog title, category, content */}
        <section className="w-full max-w-[1250px]">
          <p className="text-xl md:text-3xl">Title</p>
          <div className="text-md md:text-xl my-1">
            <Input
              id="post-title"
              label="Post Title"
              register={register}
              errors={errors}
              required
            />
          </div>

          <p className="text-xl md:text-3xl mt-6">Body</p>
          <div className="text-md md:text-xl my-1">
            <Input
              id="post-content"
              label="Post Content"
              register={register}
              errors={errors}
              required
            />
          </div>

          <p className="text-xl md:text-3xl mt-6 mb-2">Category</p>
          <Select options={options} onChange={handleChange} />
        </section>
      </div>
    </Container>
  );
};
export default WritePage;
