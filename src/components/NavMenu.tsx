'use client';
import SidebarItems from './SidebarItems';
import Image from 'next/image';
import { mainCats, moreCats } from '@src/constants/categories';
import { api } from '@src/trpc/react';
const NavMenu = () => {
  const personalCapabilites =
    api.userMetadata.getUserSidebarCapabilities.useQuery();
  return (
    <>
      <div className="flex w-full place-content-center items-center pb-7 pt-10">
        <Image
          src="/nebula-logo.png"
          alt=""
          width={60}
          height={60}
          className="mr-1.5"
        />
        <h1 className=" text-2xl font-medium">Jupiter</h1>
      </div>
      <div className="w-full px-5 py-5">
        <h1 className="px-4 text-sm font-light capitalize text-slate-500 md:text-xs">
          Main
        </h1>
        <div className="mb-5 mt-6">
          {mainCats.map((cat) => (
            <SidebarItems key={cat} cat={cat} />
          ))}
        </div>
      </div>
      <div className="w-full py-5 pl-5 md:p-5">
        <h1 className="px-4 text-sm font-light capitalize text-slate-500 md:text-xs">
          More
        </h1>
        <div className="mb-5 mt-6">
          {personalCapabilites.isSuccess &&
            personalCapabilites.data.map((cat) => (
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
