import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TitleInputProps {
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled: boolean;
}

const TitleInput: FC<TitleInputProps> = ({
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <input
      tabIndex={4}
      id={id}
      autoCorrect="off"
      autoComplete="off"
      type="text"
      disabled={disabled}
      maxLength={75}
      required
      {...register(id, { required })}
      placeholder="Title"
      className={`h-12 w-full border-b-2 bg-transparent px-4 py-2 font-merri text-xl font-semibold outline-none sm:text-2xl md:text-3xl
${errors[id] ? "border-red-700" : "border-neutral-300"}
${errors[id] ? "focus:border-red-700" : "focus:border-zinc-800"}`}
    />
  );
};

export default TitleInput;
