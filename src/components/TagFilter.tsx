import { useRef, useState } from 'react';

const tags = [
  'All',
  'Software',
  'Real Estate',
  'Finance',
  'Social',
  'Fraternity',
  'Sorority',
  'Sports',
  'Music',
  'Art',
  'Religious',
  'Culture',
  'Language',
  'Academic',
  'Education',
  'Political',
  'University Run',
] as const;

const scrollAmount = 300;

const TagFilter = () => {
  const [selected, setSelected] = useState<(typeof tags)[number]>('All');
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
    <div className="flex w-full justify-center py-9">
      <div className="relative flex w-full items-center space-x-1">
        <button
          className="absolute left-0 cursor-pointer rounded-full bg-white px-3 py-2 opacity-80 shadow-md hover:bg-gray-100 focus:outline-none"
          onClick={handleScrollLeft}
        >
          {'<'}
        </button>
        <div
          className="tag-container flex flex-1 space-x-1 overflow-x-auto overflow-y-hidden px-6"
          ref={scrollContainerRef}
        >
          {tags.map((tag, key) => (
            <button
              key={key}
              className={`${
                selected === tag
                  ? 'bg-blue-primary text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              } whitespace-nowrap rounded-3xl px-8 py-4 text-xs font-extrabold transition-colors duration-200 focus:outline-none`}
              onClick={() => setSelected(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          className="absolute right-0 cursor-pointer rounded-full bg-white px-3 py-2 opacity-80 shadow-md hover:bg-gray-100 focus:outline-none"
          onClick={handleScrollRight}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default TagFilter;
