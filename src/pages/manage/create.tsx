import Header from '@src/components/Header';
import Sidebar from '@src/components/Sidebar';
import { TagSearchBar } from '@src/components/SearchBar';
import ContactSelector from '@src/components/ContactSelector';
import OfficerSelector from '@src/components/OfficerSelector';

const Page = () => {
  return (
    <main>
      <Sidebar />
      <div className="md:pl-72">
        <Header />
        <div className="flex h-full w-full flex-col gap-y-5 p-5">
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <h1 className="text-lg font-extrabold text-black">
              Create new Organization
            </h1>
          </div>
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <h2>Organization name</h2>
            <input type="text" id="name" className="w-full bg-transparent" />
          </div>
          <div className="h-44 w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <h2>Description</h2>
            <textarea id="desc" className="h-24 w-full" />
          </div>
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <h2>Images</h2>
            <h3>profile picture</h3>
            <input type="file" />
            <h3>header image</h3>
            <input type="file" />
          </div>
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <OfficerSelector />
          </div>
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <div className="flex flex-row">
              <h2>Documents</h2>
              <button className="ml-auto">Add Document</button>
            </div>
          </div>
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <h2>Tags</h2>
            <TagSearchBar />
          </div>
          <div className="w-full rounded-md bg-slate-100 p-5 shadow-sm">
            <ContactSelector />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Page;
