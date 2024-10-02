import BuddyCard from '../FollowBuddyCard';

type FollowListProps = {
  followList: string[];
  activeButton: string;
};

function FollowList({ followList, activeButton }: FollowListProps) {
  return (
    <div className="mb-4">
      <BuddyCard followList={followList} activeButton={activeButton} />
    </div>
  );
}

export default FollowList;
