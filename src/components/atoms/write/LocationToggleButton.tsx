type LocationToggleButtonProps = {
  isKoreaSelected: boolean;
  onKoreaClick: () => void;
  onGlobalClick: () => void;
  firstLabel: string;
  secondLabel: string;
};

export default function LocationToggleButton({
  isKoreaSelected,
  onKoreaClick,
  onGlobalClick,
  firstLabel,
  secondLabel,
}: LocationToggleButtonProps) {
  return (
    <div className="flex cursor-pointer ml:4 xl:mt-8 bg-grayscale-color-100 rounded-full p-1 w-full">
      <div
        onClick={() => {
          onKoreaClick();
        }}
        className={`flex justify-center items-center rounded-full px-4 py-1 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${isKoreaSelected ? 'bg-white text-black' : 'bg-grayscale-color-100 text-white'}`}
      >
        {firstLabel}
      </div>
      <div
        onClick={() => {
          onGlobalClick();
        }}
        className={`flex justify-center items-center rounded-full px-4 py-0.5 w-1/2 text-center transition duration-300 ease-in-out font-semibold ${!isKoreaSelected ? 'bg-white text-black' : 'bg-grayscale-color-100 text-white'}`}
      >
        {secondLabel}
      </div>
    </div>
  );
}
