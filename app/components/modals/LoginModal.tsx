"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";
import Button from "../Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.close();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-bold">Welcome back!</div>
      <div className="font-light text-neutral-600 -mt-4">
        Let&rsquo;s get you back in!
      </div>
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
        icon={FcGoogle}
      />

      <div className="text-center text-neutral-700">
        <p className="text-md mb-2">New to InsightOut?</p>
        <Button
          outline
          label="Create An Account"
          onClick={() => {
            loginModal.close();
            registerModal.open();
          }}
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="Login"
      buttonLabel="Login"
      onClose={loginModal.close}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default LoginModal;
