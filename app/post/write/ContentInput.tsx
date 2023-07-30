"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ContentInputProps {
  id: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled: boolean;
  className?: string;
}

const ContentInput: React.FC<ContentInputProps> = ({
  id,
  placeholder,
  errors,
  disabled,
  className = "",
  register,
}) => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);
  };

  const handleUnload = () => {
    // Optionally, you can show a different warning message when navigating to a different route within the app
    // (e.g., "You have unsaved changes. Are you sure you want to leave this page?")

    // Show the warning alert when navigating away from the page
    return "You have unsaved changes. Are you sure you want to leave this page?";
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Some browsers require a non-empty string here
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  useEffect(() => {
    handleUnload();
  }, [router]);

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={20}
        cols={10}
        required
        {...register(id)}
        minLength={500}
        maxLength={5000}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full resize-y rounded-md border-2 bg-white p-4 outline-none transition
      ${errors[id] ? "border-red-700" : "border-neutral-300"}
      ${errors[id] ? "focus:border-red-700" : "focus:border-zinc-800"}
      ${className}`}
      />
      <span className="absolute bottom-2 right-2 text-xs text-neutral-500 md:text-sm">
        Characters: {count} / 5000
      </span>
    </div>
  );
};
export default ContentInput;
