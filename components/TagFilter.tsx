import { useState } from 'react';

const tags = [
  'All',
  'Software',
  'Real Estate',
  'Finance',
  'Social',
  'Fraternity',
  'Sorority',
  'Other',
] as const;

const TagFilter = () => {
  const [selected, setSelected] = useState<(typeof tags)[number]>('All');

  const onClick = (tag: (typeof tags)[number]) => setSelected(tag);
  return (
    <div className="flex justify-center">
      <div className="flex overflow-x-auto md:space-x-2 space-x-1">
        {tags.map((tag, key) => (
          <button
            key={key}
            className={`${
              selected === tag
                ? 'bg-blue-300 hover:bg-blue-400 focus:outline-none'
                : 'focus:outline-none bg-slate-50 hover:bg-slate-100'
            } font-bold py-2 px-4 rounded-full transition-colors duration-200 whitespace-nowrap`}
            onClick={() => onClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
