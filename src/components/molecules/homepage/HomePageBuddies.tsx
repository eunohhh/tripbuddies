const HomePageBuddies = () => {
  const buddies = Array.from({ length: 5 }, (_, index) => `Buddy ${index + 1}`);
  return (
    <>
      {buddies.map((buddy, index) => (
        <div key={index} className="min-w-[200px] h-[75px] p-[12px] rounded-md bg-gray-200">
          {buddy}
        </div>
      ))}
    </>
  );
};

export default HomePageBuddies;
