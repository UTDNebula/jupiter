import { HeartIcon, HeartOutline } from './Icons';

const LikeButton = ({ liked }: { liked: boolean }) => {
  return (
    <div className="h-7 w-7">
      {liked ? (
        <HeartIcon fill="fill-red-600" />
      ) : (
        <HeartOutline fill="fill-white" />
      )}
    </div>
  );
};
export default LikeButton;
