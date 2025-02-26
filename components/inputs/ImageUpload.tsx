import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";

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
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    (result: CloudinaryUploadWidgetResults) => {
      if (result.event === "queues-start") {
        setIsUploading(true);
        return;
      }

      if (result.event === "success" && result.info) {
        setIsUploading(false);
        const info = result.info as { secure_url: string };
        onChange(info.secure_url);
        toast.success("Image uploaded successfully!");
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="updapnr1"
      options={{
        maxFiles: 1,
        sources: ["local", "camera", "unsplash"],
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        maxFileSize: 5000000, // 5MB
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      }}
      onError={(err) => {
        setIsUploading(false);
        const errorMessage =
          typeof err === "string"
            ? err
            : err?.statusText || "Failed to upload image";
        toast.error(errorMessage);
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => {
              if (!isUploading) {
                open?.();
              }
            }}
            className={`relative flex cursor-pointer flex-col items-center justify-center border-2 border-dashed
            border-neutral-300 bg-white
            text-neutral-600 transition hover:opacity-70 focus:ring-4 focus:ring-zinc-800
            ${isUploading ? "cursor-not-allowed opacity-50" : ""}
            ${className}`}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-zinc-800"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              <TbPhotoPlus size={50} />
            )}
            {value && !isUploading && (
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
