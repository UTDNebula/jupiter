import SidebarItems from './SidebarItems';
import Image from 'next/image';
import { mainCats, moreCats } from '@src/constants/categories';

// Keep in mind that in all routes we need pl-72 for the sidebar
const Sidebar = () => {
  return (
    <div className="absolute hidden h-full w-72 bg-slate-100 md:block">
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
        <h1 className="px-4 text-xs font-light capitalize text-slate-500">
          Main
        </h1>
        <div className="mb-5 mt-6">
          {mainCats.map((cat) => (
            <SidebarItems key={cat} cat={cat} />
          ))}
        </div>
      </div>
      <div className="w-full p-5">
        <h1 className="px-4 text-xs font-light capitalize text-slate-500">
          More
        </h1>
        <div className="mb-5 mt-6">
          {moreCats.map((cat) => (
            <SidebarItems key={cat} cat={cat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
