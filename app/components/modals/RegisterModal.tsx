"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Input from "../inputs/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered successfully!");
        registerModal.close();
        loginModal.open();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Welcome back!</div>
      <div className="font-light text-neutral-600 -mt-4">
        Let&rsquo;s get you back in!
      </div>
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <div className="border-t-[2px] border-gray-300" />
      <Button
        label="Continue With Google"
        onClick={() => signIn("google")}
        outline
      />
      <div className="text-center text-neutral-700">
        <p className="text-md mb-2">Already have an account?</p>
        <Button
          outline
          label="Sign In"
          onClick={() => {
            registerModal.close();
            loginModal.open();
          }}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="Register"
      buttonLabel="Register"
      onClose={registerModal.close}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
