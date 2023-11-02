import { HeartIcon } from './Icons';

const LikeButton = ({ liked }: { liked: boolean }) => {
  return (
    <div className="h-7 w-7">
      {liked ? (
        <HeartIcon fill="fill-red-600" />
      ) : (
        <HeartIcon fill="fill-white" />
      )}
    </div>
  );
};
export default LikeButton;
