"use client";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type ProgressIndicatorProps = {
  step: number;
  counts: number;
  className?: string;
};

export default function ProgressIndicator({
  step,
  counts,
  className,
}: ProgressIndicatorProps) {
  const pathname = usePathname();

  return (
    <div className={twMerge("ml-2 flex items-center pt-16 xl:pt-2", className)}>
      {[...Array(counts)].map((_, index) => (
        <div
          key={index}
          className={twMerge(
            "mx-1 h-3 w-3 rounded-full bg-gray-100 xl:h-4 xl:w-4",
            !pathname.startsWith("/tutorial") &&
              index <= step &&
              "bg-main-color",
            pathname.startsWith("/tutorial") &&
              index === step &&
              "bg-main-color",
          )}
        ></div>
      ))}
    </div>
  );
}
