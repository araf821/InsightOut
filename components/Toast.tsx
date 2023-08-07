import { FC } from "react";
import { toast } from "react-hot-toast";

interface ToastProps {
  message: string;
  duration?: number;
}

// @ts-ignore
const Toast: FC<ToastProps> = ({ message, duration = 5000 }) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto bg-black p-4`}
      >
        HELLO
      </div>
    ),
    // duration is whatever you specify + 1
    { duration: duration }
  );
};

export default Toast;
