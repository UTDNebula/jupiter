import React, { useRef } from 'react';

const tags = [
  'All',
  'Software',
  'Real Estate',
  'Finance',
  'Social',
  'Fraternity',
  'Sorority',
  'Other',
];

const TagFilter = () => {
  const [selected, setSelected] = React.useState('All');
  const tagContainerRef = useRef<HTMLDivElement>(null);

  const onClick = (tag: string) => setSelected(tag);

  const scrollTags = (direction: 'left' | 'right') => {
    const container = tagContainerRef.current;
    if (!container) return;
    if (direction === 'left') container.scrollLeft -= container.offsetWidth;
    else if (direction === 'right')
      container.scrollLeft += container.offsetWidth;
  };

  return (
    <div className="flex justify-center">
      <div className="flex overflow-x-auto space-x-2" ref={tagContainerRef}>
        {tags.map((tag, key) => (
          <button
            key={key}
            className={`${
              selected === tag
                ? 'bg-blue-300 hover:bg-blue-400 focus:outline-none'
                : 'bg-slate-300 hover:bg-slate-400 focus:outline-none'
            } text-slate-800 font-bold py-2 px-4 rounded-full transition-colors duration-200 whitespace-nowrap`}
            onClick={() => onClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {tagContainerRef.current &&
        tagContainerRef.current.scrollWidth >
          tagContainerRef.current.offsetWidth && (
          <>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-2 transition-colors duration-200"
              onClick={() => scrollTags('left')}
            >
              {'<'}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full ml-2 transition-colors duration-200"
              onClick={() => scrollTags('right')}
            >
              {'>'}
            </button>
          </>
        )}
    </div>
  );
};

export default TagFilter;
