import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        p-4 pt-6
        font-light
        bg-white
        border-2 rounded-md outline-none
        transition
        ${errors[id] ? "border-red-700" : "border-neutral-300"}
        ${errors[id] ? "focus:border-red-700" : "focus:border-black"}
        `}
      />
      <label
        className={`
            absolute
            text-md
            duration-200
            transform
            -translate-y-3
            top-5
            left-4
            z-10
            origin-[0]
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-red-700" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
