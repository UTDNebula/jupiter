'use client';
import { useState } from 'react';
import { HeartIcon, HeartOutline } from '../icons/Icons';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="h-7 w-7"
      onClick={() => {
        setLiked(!liked);
      }}
    >
      {liked ? (
        <HeartIcon fill="fill-red-600" />
      ) : (
        <HeartOutline fill="fill-white" />
      )}
    </div>
  );
};
export default LikeButton;
