"use client";

import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import PostInput from "@/app/components/inputs/PostInput";
import ToolbarComponent from "@/app/components/radix/Toolbar";
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
      <div className="py-8">
        {/* Heading */}
        <p className="text-4xl text-zinc-800 sm:text-5xl lg:text-6xl">
          <span className="font-merri font-bold">New Post</span>
        </p>
        <hr className="w-12 border-4 border-accent md:w-20" />

        {/* Content Container */}
        <div className="my-6 flex w-full flex-col justify-between gap-6 xl:flex-row">
          {/* Form */}
          <form className="flex w-full max-w-[1280px] flex-col gap-4 rounded-md border px-4 py-6 shadow-lg">
            {/* Title */}
            <input
              id="title"
              autoCorrect="off"
              autoComplete="off"
              type="text"
              placeholder="Title"
              className="h-12 w-full border-b-2 bg-transparent px-4 py-2 font-merri text-xl font-semibold outline-none sm:text-2xl md:text-3xl "
            />

            <div className="mx-auto max-w-[700px] space-y-2 text-center">
              <ImageUpload
                value={imgSrc}
                onChange={(value) => setCustomValue("imgSrc", value)}
              />
              <p className="text-lg font-bold md:text-2xl">Upload An Image</p>
              <p className="font-bold">Or</p>
              <p className="cursor-not-allowed text-xl font-bold text-zinc-600 underline sm:text-2xl md:text-3xl">
                Import from Unsplash
              </p>
              <p className="md:text-md text-sm font-light">
                - Feature Coming Soon -
              </p>
            </div>
            <ToolbarComponent />
            <PostInput
              id="content"
              errors={errors}
              placeholder="Post Content"
              register={register}
              required
              textarea
              className="-mt-2"
            />

            {/* Buttons */}
            <div className="flex flex-col justify-between gap-12 md:flex-row">
              <Button label="Save As Draft" outline className="max-w-[400px]" />
              <Button label="Publish Post" className="max-w-[400px]" />
            </div>
          </form>

          {/* AD */}
          <div className="w-full max-w-[400px] rounded-md bg-primary p-4">
            <p className="text-xl">Ad Goes Here</p>
          </div>
        </div>
        {/* <div className="mb-8 flex flex-col items-center justify-center gap-8 font-semibold">
          <section className="flex w-full max-w-[945px] flex-col items-center justify-center gap-8"> */}
        {/* Photo upload */}
        {/* <ImageUpload
              value={imgSrc}
              onChange={(value) => setCustomValue("imgSrc", value)}
            /> */}

        {/* Title */}
        {/* <PostInput
              id="title"
              errors={errors}
              placeholder="Title"
              register={register}
              required
            /> */}

        {/* <PostInput
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
        </div> */}
      </div>
    </Container>
  );
};
export default WritePage;
