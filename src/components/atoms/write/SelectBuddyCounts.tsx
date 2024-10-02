type SelectBuddyCountsProps = {
  buddyCounts: number | null;
  setBuddyCounts: (count: number | null) => void;
};

export default function SelectBuddyCounts({ buddyCounts, setBuddyCounts }: SelectBuddyCountsProps) {
  // const [buddyCounts, setBuddyCounts] = useState(1);

  return (
    <div className="flex flex-row gap-[2px]">
      <button
        className="text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center"
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
        className="md:p-2 p-1 text-xs md:text-base focus:outline-none text-center h-[24px]"
        readOnly
        name="custom-input-number"
      />
      <div className="bg-main-color w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] text-white md:text-base flex items-center justify-center cursor-default">
        <span>{buddyCounts}</span>
      </div>
      <div className="buttons-wrap flex flex-col items-center gap-[2px]">
        <button
          className="text-[#647484] w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] bg-[#edeff1] hover:bg-gray-400 flex items-center justify-center"
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
