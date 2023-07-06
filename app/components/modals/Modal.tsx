"use client";

import { useCallback, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  buttonLabel: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  buttonLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-800/20 flex items-center justify-center">
      <div className="w-full md:w-4/6 lg:w-3/6 max-w-[700px]">
        <div
          className={`translate duration-300 h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
        `}
        >
          <div className="bg-slate-200 h-full w-full flex flex-col shadow-lg sm:rounded-lg border-0 p">
            {/* Header */}
            <div className="flex items-center justify-center relative p-4 text-white bg-gray-800 border-b-[1px] border-slate-400 sm:rounded-t-md">
              <button
                className="absolute left-5 p-1 border-0 opacity-70 hover:scale-125 transition"
                onClick={handleClose}
              >
                <IoIosClose size={30} />
              </button>
              <p className="text-lg font-semibold tracking-wider">{title}</p>
            </div>

            {/* Body Content */}
            <div className="flex-auto relative p-6">{body}</div>

            {/* Footer Content */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                <Button label={buttonLabel} onClick={handleSubmit} />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
