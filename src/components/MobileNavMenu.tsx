'use client';

import { type Dispatch, type SetStateAction } from 'react';

import NavMenu from './NavMenu';

const MobileNavMenu = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="fixed left-0 top-0 z-50 h-screen w-full bg-black bg-opacity-50"
      ></div>
      <nav className="p-y fixed left-0 top-0 z-50 h-screen w-1/2 bg-slate-100 max-[600px]:w-3/4 md:hidden">
        <NavMenu />
      </nav>
    </>
  );
};

export default MobileNavMenu;
