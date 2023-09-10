import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  rounded?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  className,
  rounded,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="updapnr1"
      options={{
        maxFiles: 1,
        sources: ["unsplash", "local", "camera"],
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`relative z-[999] flex cursor-pointer flex-col items-center justify-center border-2 border-dashed
            border-neutral-300 bg-white
            text-neutral-600 transition hover:opacity-70 focus:ring-4 focus:ring-zinc-800 ${className}`}
          >
            <TbPhotoPlus size={50} />
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  alt="image upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  className={rounded ? `${rounded}` : ""}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
export default ImageUpload;
