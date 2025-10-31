type SelectBuddyCountsProps = {
  buddyCounts: number | null;
  setBuddyCounts: (count: number | null) => void;
};

export default function SelectBuddyCounts({
  buddyCounts,
  setBuddyCounts,
}: SelectBuddyCountsProps) {
  // const [buddyCounts, setBuddyCounts] = useState(1);

  return (
    <div className="flex flex-row gap-[2px]">
      <button
        type="button"
        className="flex h-[30px] w-[30px] items-center justify-center bg-[#edeff1] text-[#647484] hover:bg-gray-400 xl:h-[50px] xl:w-[50px]"
        onClick={() => {
          if (buddyCounts !== null && buddyCounts > 1) {
            setBuddyCounts(buddyCounts - 1);
          }
        }}
        disabled={buddyCounts === 1}
      >
        -
      </button>
      <input
        type="hidden"
        className="h-[24px] p-1 text-center text-xs focus:outline-none md:p-2 md:text-base"
        readOnly
        name="custom-input-number"
      />
      <div className="flex h-[30px] w-[30px] cursor-default items-center justify-center bg-main-color text-white md:text-base xl:h-[50px] xl:w-[50px]">
        <span>{buddyCounts}</span>
      </div>
      <div className="buttons-wrap flex flex-col items-center gap-[2px]">
        <button
          type="button"
          className="flex h-[30px] w-[30px] items-center justify-center bg-[#edeff1] text-[#647484] hover:bg-gray-400 xl:h-[50px] xl:w-[50px]"
          onClick={() => {
            if (buddyCounts !== null && buddyCounts < 5) {
              setBuddyCounts(buddyCounts + 1);
            }
          }}
          disabled={buddyCounts === 4}
        >
          +
        </button>
      </div>
    </div>
  );
}
