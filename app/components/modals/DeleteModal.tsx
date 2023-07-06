"use client";

import { useCallback, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface DeleteModalProps {
  isOpen?: boolean;
  onClose: () => void;
  postName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  postName,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20 px-4">
      <div
        className={`translate w-full max-w-[500px] duration-300 md:w-4/6 lg:w-3/6
            ${showModal ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Header */}
        <div className="p flex h-full w-full flex-col border-0 bg-bg shadow-lg sm:rounded-lg">
          <div className="relative flex items-center justify-center bg-primary p-4 text-white shadow-md sm:rounded-t-md">
            <button
              className="absolute left-5 border-0 p-1 opacity-70 transition hover:scale-125"
              onClick={handleClose}
            >
              <IoIosClose size={30} />
            </button>
            <p className="text-lg font-semibold tracking-wider">
              Confirm Deletion
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-b-md bg-bg px-4 py-4">
          <p className="">
            Are you sure you want to delete the following post?
          </p>
          <p>&ldquo;{postName}&rdquo;</p>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
