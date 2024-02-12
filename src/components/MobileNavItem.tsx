'use client';

import React, { type FC } from 'react';
import Link from 'next/link';

import { IconMap, type allCats, routeMap } from '@src/constants/categories';
import { RightChevron } from '../icons/Icons';

const MobileNavItem: FC<{ cat: allCats[number]; active: boolean }> = ({
  cat,
  active,
}) => {
  const Icon = IconMap[cat];
  const route = routeMap[cat];

  if (!route) return null;

  return (
    <div
      className={`${
        active
          ? `-my-2.5 mb-2.5 rounded-3xl bg-white py-2.5 shadow-md last:-mb-2.5`
          : 'mb-5'
      }`}
    >
      <Link
        className=" 
        flex h-full w-full cursor-pointer  items-start rounded-lg bg-transparent px-5 text-base transition-transform"
        href={route}
        passHref
      >
        <div className="flex items-center gap-x-4">
          {Icon && (
            <Icon fill={`${active ? 'fill-blue-primary' : 'fill-slate-500'}`} />
          )}
          <h1
            className={`text-base font-medium capitalize ${
              active ? 'text-blue-primary' : 'text-slate-500'
            }`}
          >
            {cat}
          </h1>
        </div>
        <div className="ml-auto">
          <RightChevron />
        </div>
      </Link>
    </div>
  );
};

export default MobileNavItem;
