'use server';
import { api } from '@src/trpc/server';
import NavMenu from './NavMenu';

// Keep in mind that in all routes we need pl-72 for the sidebar
const Sidebar = async () => {
  const userSidebarCapabilities =
    await api.userMetadata.getUserSidebarCapabilities();
  return (
    <div className="hidden w-72 bg-slate-100 md:block">
      <NavMenu userCapabilites={userSidebarCapabilities} />
    </div>
  );
};

export default Sidebar;
