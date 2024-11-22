'use client';
import { type FC, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IconMap, type allCats, routeMap } from '@src/constants/categories';
import { RightChevron } from '@src/icons/Icons';

const SidebarItems: FC<{ cat: allCats[number] }> = ({ cat }) => {
  const Icon = IconMap[cat];
  const router = useRouter();
  const route = routeMap[cat];
  const pathName = usePathname();
  const active = pathName === route;

  const [mouseOver, setMouseOver] = useState(false);
  const handleMouseOver = () => setMouseOver(true);
  const handleMouseOut = () => setMouseOver(false);

  if (!route) return null;

  return (
    <div
      className={`group relative transition-all duration-200 ease-in-out ${
        active || mouseOver
          ? 'my-1 rounded-2xl bg-white shadow-lg'
          : 'my-2 rounded-2xl hover:bg-gray-50'
      }`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div
        className="
        flex h-12 w-full cursor-pointer items-center rounded-lg
        bg-transparent px-5 text-base transition-colors duration-200
        ease-in-out md:w-64 md:text-sm"
        onClick={() => void router.push(route)}
      >
        <div className="flex items-center gap-x-4">
          {Icon && (
            <Icon fill={active ? 'fill-blue-primary' : 'fill-slate-500'} />
          )}
          <h1
            className={`text-base font-medium capitalize transition-colors
            duration-200 md:text-sm ${
              active
                ? 'text-blue-primary'
                : 'text-slate-500 group-hover:text-blue-primary'
            }`}
          >
            {cat}
          </h1>
        </div>
        <div
          className={`ml-auto transition-transform duration-200 ${
            active || mouseOver ? 'translate-x-0' : '-translate-x-1'
          }`}
        >
          <RightChevron />
        </div>
      </div>
    </div>
  );
};

export default SidebarItems;
