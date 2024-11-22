'use client';
import SidebarItems from './SidebarItems';
import Image from 'next/image';
import {
  mainCats,
  moreCats,
  type personalCats,
} from '@src/constants/categories';
type NavMenuProps = {
  userCapabilites: Array<(typeof personalCats)[number]>;
};
const NavMenu = ({ userCapabilites }: NavMenuProps) => {
  return (
    <>
      <div className="flex w-full place-content-center items-center pb-7 pt-10 transition-all duration-300">
        <Image
          src="/nebula-logo.png"
          alt=""
          width={60}
          height={60}
          className="mr-1.5 transition-transform duration-300 hover:scale-105"
        />
        <h1 className="text-2xl font-medium transition-colors duration-300 hover:text-blue-primary">
          Jupiter
        </h1>
      </div>
      <div className="w-full px-5 py-5 transition-all duration-300">
        <h1 className="px-4 text-sm font-light capitalize text-slate-500 transition-colors duration-300 md:text-xs">
          Main
        </h1>
        <div className="mb-5 mt-6 space-y-1">
          {mainCats.map((cat) => (
            <SidebarItems key={cat} cat={cat} />
          ))}
        </div>
      </div>
      <div className="w-full py-5 pl-5 transition-all duration-300 md:p-5">
        <h1 className="px-4 text-sm font-light capitalize text-slate-500 transition-colors duration-300 md:text-xs">
          More
        </h1>
        <div className="mb-5 mt-6 space-y-1">
          {userCapabilites.map((cat) => (
            <SidebarItems key={cat} cat={cat} />
          ))}
          {moreCats.map((cat) => (
            <SidebarItems key={cat} cat={cat} />
          ))}
        </div>
      </div>
    </>
  );
};
export default NavMenu;
