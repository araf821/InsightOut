import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface PostInputProps {
  id: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  textarea?: boolean;
}

const PostInput: React.FC<PostInputProps> = ({
  id,
  placeholder,
  required,
  register,
  errors,
  textarea,
}) => {
  if (textarea) {
    return (
      <textarea
        id={id}
        rows={10}
        cols={10}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`w-full resize-none rounded-md border-2 bg-white p-4 font-light outline-none transition
        ${errors[id] ? "border-red-700" : "border-neutral-300"}
        ${errors[id] ? "focus:border-red-700" : "focus:border-zinc-800"}`}
      />
    );
  }

  return (
    <input
      id={id}
      type="text"
      {...register(id, { required })}
      placeholder={placeholder}
      className={`w-full rounded-md border-2 bg-white p-4 font-light outline-none transition
        ${errors[id] ? "border-red-700" : "border-neutral-300"}
        ${errors[id] ? "focus:border-red-700" : "focus:border-zinc-800"}`}
    />
  );
};
export default PostInput;
