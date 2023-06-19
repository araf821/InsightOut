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
    <div className="flex h-[60vh] p-4 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-zinc-800 p-12 shadow-xl sm:p-16 md:p-20 lg:p-32">
        <div className="text-xl font-semibold md:text-2xl">{title}</div>
        <div className="font-light text-center text-neutral-800">{subtitle}</div>
        {button && (
          <Button outline label="Go Home" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
};
export default EmptyState;
