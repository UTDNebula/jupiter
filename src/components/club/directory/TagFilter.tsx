'use client';
import { useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';

const scrollAmount = 300;

const TagFilter = ({ tags }: { tags: string[] }) => {
  const router = useRouter();
  const params = useSearchParams();
  const selectedTag = params.get('tag') || 'All';

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const setSelected = (tag: string) =>
    router.replace(`/?tag=${tag}`, { scroll: false });

  const handleScrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };
  return (
    <div className="flex w-full justify-center py-9" id="top">
      <div className="relative flex w-full items-center space-x-1">
        <button
          className="absolute left-0 cursor-pointer rounded-full bg-white px-1.5 py-1 opacity-80 shadow-md hover:bg-gray-100 focus:outline-none md:px-3 md:py-2"
          onClick={handleScrollLeft}
        >
          <LeftArrowIcon fill="fill-slate-500" />
        </button>
        <div
          className="tag-container flex flex-1 space-x-1 overflow-x-auto overflow-y-hidden px-6"
          ref={scrollContainerRef}
        >
          {tags.map((tag, key) => (
            <button
              key={key}
              className={`${
                selectedTag === tag
                  ? 'bg-blue-primary text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              } whitespace-nowrap rounded-3xl px-8 py-4 text-sm font-extrabold transition-colors duration-200 focus:outline-none md:text-xs`}
              onClick={() => setSelected(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          className="absolute right-0 cursor-pointer rounded-full bg-white px-1.5 py-1 opacity-80 shadow-md hover:bg-gray-100 focus:outline-none md:px-3 md:py-2"
          onClick={handleScrollRight}
        >
          <RightArrowIcon fill="fill-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default TagFilter;
