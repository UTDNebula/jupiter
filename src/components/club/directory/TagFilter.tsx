'use client';
import { useRef } from 'react';
import { LeftArrowIcon, RightArrowIcon } from '@src/icons/Icons';
import Link from 'next/link';

const scrollAmount = 300;

type Props = {
  tags: string[];
  selectedTag?: string;
};

const TagFilter = ({ tags, selectedTag }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
            <Link
              key={key}
              href={tag === selectedTag ? '/' : `/?tag=${tag}`}
              className={`${
                selectedTag === tag
                  ? 'bg-blue-primary text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              } whitespace-nowrap rounded-3xl px-8 py-4 text-sm font-extrabold transition-colors duration-200 focus:outline-none md:text-xs`}
              scroll={false}
              prefetch
              replace
            >
              {tag}
            </Link>
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
