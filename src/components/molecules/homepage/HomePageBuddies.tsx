const HomePageBuddies = () => {
  const buddies = Array.from({ length: 5 }, (_, index) => `Buddy ${index + 1}`);
  return (
    <>
      {buddies.map((buddy, index) => (
        <div
          key={index}
          className="h-[75px] min-w-[200px] rounded-md bg-gray-200 p-[12px]"
        >
          {buddy}
        </div>
      ))}
    </>
  );
};

export default HomePageBuddies;
