import { twMerge } from 'tailwind-merge';

export default function SelectedResultRealtimeText({
  firstLabel,
  secondLabel,
  selectedData,
  isMini,
}: {
  firstLabel?: string;
  secondLabel?: string;
  selectedData?: string;
  isMini?: boolean | null | 0;
}) {
  return (
    // <div className="text-center pt-2">
    <div className="text-center">
      <span className={twMerge('text-sm text-gray-500', isMini && 'text-xs')}>{firstLabel}</span>
      <span className={twMerge('text-md font-bold text-main-color', isMini && 'text-sm')}>
        {selectedData}
      </span>
      <span className={twMerge('text-sm text-gray-500', isMini && 'text-xs')}>{secondLabel}</span>
    </div>
  );
}
