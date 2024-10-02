'use client';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type ProgressIndicatorProps = {
  step: number;
  counts: number;
  className?: string;
};

export default function ProgressIndicator({ step, counts, className }: ProgressIndicatorProps) {
  const pathname = usePathname();

  return (
    <div className={twMerge('flex ml-2 pt-16 xl:pt-2 items-center', className)}>
      {[...Array(counts)].map((_, index) => (
        <div
          key={index}
          className={twMerge(
            'h-3 w-3 xl:h-4 xl:w-4 rounded-full mx-1 bg-gray-100',
            !pathname.startsWith('/tutorial') && index <= step && 'bg-main-color',
            pathname.startsWith('/tutorial') && index === step && 'bg-main-color',
          )}
        ></div>
      ))}
    </div>
  );
}
