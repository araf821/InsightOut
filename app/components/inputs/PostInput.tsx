"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";

interface PostInputProps {
  id: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled: boolean;
  className?: string;
}

const PostInput: React.FC<PostInputProps> = ({
  id,
  placeholder,
  errors,
  disabled,
  className = "",
  register,
}) => {
  const [count, setCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);
  };

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={20}
        cols={10}
        required
        {...register(id)}
        minLength={250}
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
export default PostInput;
