import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  textArea?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  register,
  errors,
  textArea,
}) => {
  if (textArea) {
    return (
      <div className="relative w-full">
        <textarea
          rows={10}
          id={id}
          {...register(id, { required })}
          placeholder="Content"
          className={`
          peer
          w-full
          resize-none
          rounded-md border-2
          bg-white
          p-4
          pt-4 font-light
          transition
          ${errors[id] ? "border-red-700" : "border-neutral-300"}
          ${errors[id] ? "focus:border-red-700" : "focus:border-black"}
        `}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <input
        id={id}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        rounded-md border-2
        bg-white
        p-4
        pt-6 font-light outline-none
        transition
        ${errors[id] ? "border-red-700" : "border-neutral-300"}
        ${errors[id] ? "focus:border-red-700" : "focus:border-black"}
        `}
      />
      <label
        className={`
            text-md
            absolute
            left-4
            top-5
            z-10
            origin-[0]
            -translate-y-3
            transform
            duration-200
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:scale-100
            peer-focus:-translate-y-4
            peer-focus:scale-75
            ${errors[id] ? "text-red-700" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
