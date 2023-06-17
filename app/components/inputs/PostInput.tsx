"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState, useEffect } from "react";

interface PostInputProps {
  id: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled: boolean;
  textarea?: boolean;
  className?: string;
}

const PostInput: React.FC<PostInputProps> = ({
  id,
  placeholder,
  required,
  register,
  errors,
  textarea,
  disabled,
  className = "",
}) => {
  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    setCount(e.target.value.length);
  };

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={10}
        cols={10}
        maxLength={3000}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full resize-none rounded-md border-2 bg-white p-4 outline-none transition
      ${errors[id] ? "border-red-700" : "border-neutral-300"}
      ${errors[id] ? "focus:border-red-700" : "focus:border-zinc-800"}
      ${className}`}
      />
      <span className="absolute bottom-2 right-2 text-xs text-neutral-500 md:text-sm">
        Characters: {count} / 3000
      </span>
    </div>
  );
};
export default PostInput;
