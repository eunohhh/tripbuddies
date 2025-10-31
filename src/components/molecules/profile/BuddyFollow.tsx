import React from "react";

type BuddyFollowProps = {
  id: string;
  type: string;
  count: number;
};

const BuddyFollow: React.FC<BuddyFollowProps> = ({ type, count }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-lg">{count}</div>
      <div className="text-gray-500 text-sm">{type}</div>
    </div>
  );
};

export default BuddyFollow;
