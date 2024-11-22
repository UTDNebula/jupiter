import { api } from '@src/trpc/server';
import NavMenu from './NavMenu';

const Sidebar = async () => {
  const userSidebarCapabilities =
    await api.userMetadata.getUserSidebarCapabilities();
  return (
    <div className="absolute hidden h-full w-72 bg-slate-100 shadow-lg transition-all duration-300 ease-in-out md:block">
      <NavMenu userCapabilites={userSidebarCapabilities} />
    </div>
  );
};

export default Sidebar;
