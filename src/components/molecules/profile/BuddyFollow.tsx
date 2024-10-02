import React from 'react';

type BuddyFollowProps = {
  id: string;
  type: string;
  count: number;
};

const BuddyFollow: React.FC<BuddyFollowProps> = ({ type, count }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold">{count}</div>
      <div className="text-sm text-gray-500">{type}</div>
    </div>
  );
};

export default BuddyFollow;
