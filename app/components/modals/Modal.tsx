"use client";

import { useCallback, useEffect, useState } from "react";

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
    <div>
        asdf
    </div>
  );
};
export default Modal;

/**
 * <div className="flex justify-center items-center fixed z-10 bg-neutral-800/50">
      <div className="relative w-full h-full my-6 mx-auto md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
        <div
          className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
        `}
        >
          <div
            className="
                translate
                w-full
                h-full
                lg:h-auto
                md:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                bg-white
                outline-none
                focus:outline-none
            "
          >
            <div
              className="
                    flex
                    items-center
                    p-6
                    rounded-t
                    justify-center
                    relative
                    border-b-[1px]
                "
            >
              <button>adsf</button>
            </div>
          </div>
        </div>
      </div>
    </div>
 */