import BuddyCard from '../FollowBuddyCard';

type FollowerListProps = {
  followerList: string[];
  activeButton: string;
};

function FollowerList({ followerList, activeButton }: FollowerListProps) {
  return (
    <div className="mb-4">
      <BuddyCard followList={followerList} activeButton={activeButton} />
    </div>
  );
}

export default FollowerList;
