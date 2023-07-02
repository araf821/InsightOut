"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface MTStateProps {
  title: string;
  subtitle?: string;
  button?: boolean;
}

const EmptyState: React.FC<MTStateProps> = ({ title, subtitle, button }) => {
  const router = useRouter();

  return (
    <div className="flex h-[60vh] items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg border-2 border-zinc-800 p-12 shadow-xl sm:p-16 md:p-20 lg:p-32">
        <div className="translate-y-2 font-josefin text-xl font-semibold md:text-2xl lg:text-3xl xl:text-4xl">
          {title}
        </div>
        <div className="balance max-w-[500px] text-center font-light text-neutral-700">
          {subtitle}
        </div>
        {button && (
          <Button outline label="Go Home" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};
export default EmptyState;
