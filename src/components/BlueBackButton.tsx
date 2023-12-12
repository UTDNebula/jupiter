'use client';

import { useRouter } from 'next/navigation';
import { LeftArrowIcon } from '../icons/Icons';

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="flex h-min flex-row align-middle">
      <button
        onClick={() => router.back()}
        type="button"
        className="box-content h-fit w-fit rounded-full bg-blue-primary p-2 hover:bg-blue-700 active:bg-blue-800"
      >
        <LeftArrowIcon />
      </button>
    </div>
  );
};
export default BackButton;
