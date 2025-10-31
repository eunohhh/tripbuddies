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
    <div className="ml:4 flex w-full cursor-pointer rounded-full bg-grayscale-color-100 p-1 xl:mt-8">
      <div
        onClick={() => {
          onKoreaClick();
        }}
        className={`flex w-1/2 items-center justify-center rounded-full px-4 py-1 text-center font-semibold transition duration-300 ease-in-out ${isKoreaSelected ? "bg-white text-black" : "bg-grayscale-color-100 text-white"}`}
      >
        {firstLabel}
      </div>
      <div
        onClick={() => {
          onGlobalClick();
        }}
        className={`flex w-1/2 items-center justify-center rounded-full px-4 py-0.5 text-center font-semibold transition duration-300 ease-in-out ${!isKoreaSelected ? "bg-white text-black" : "bg-grayscale-color-100 text-white"}`}
      >
        {secondLabel}
      </div>
    </div>
  );
}
