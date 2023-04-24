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
  const onClick = (tag: (typeof tags)[number]) => setSelected(tag);

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
    <div className="flex justify-center w-full">
      <div className="relative flex items-center space-x-1 w-full">
        <button
          className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-full bg-white shadow-md focus:outline-none absolute left-0 opacity-80"
          onClick={handleScrollLeft}
        >
          {'<'}
        </button>
        <div
          className="flex space-x-1 flex-1 overflow-x-auto overflow-y-hidden tag-container"
          ref={scrollContainerRef}
        >
          {tags.map((tag, key) => (
            <button
              key={key}
              className={`${
                selected === tag
                  ? 'bg-blue-300 hover:bg-blue-400'
                  : 'bg-gray-100 hover:bg-gray-200'
              } font-bold py-2 px-4 rounded-full transition-colors duration-200 whitespace-nowrap focus:outline-none`}
              onClick={() => onClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          className="cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-full bg-white shadow-md focus:outline-none absolute right-0 opacity-80"
          onClick={handleScrollRight}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default TagFilter;
