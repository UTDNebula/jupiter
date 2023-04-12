import React from 'react';

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
  const onClick = (tag: string) => setSelected(tag);

  return (
    <div className="pt-60">
      <div className="flex flex-row justify-center">
        {tags.map((tag, key) => (
          <div key={key} className="mx-2">
            <button
              className={`${
                selected === tag
                  ? 'bg-blue-300 hover:bg-blue-400'
                  : 'bg-slate-300 hover:bg-slate-400'
              } text-slate-800 font-bold py-2 px-4 rounded-full`}
              onClick={() => onClick(tag)}
            >
              {tag}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
