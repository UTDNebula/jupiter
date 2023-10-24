import Header from '../components/BaseHeader';
import Carousel from '../components/Carousel';
import TagFilter from '../components/TagFilter';
import OrgDirectoryGrid from '../components/OrgDirectoryGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jupiter - Nebula',
  description: 'Get connected on campus.',
};

const Home = () => {
  return (
    <main className="md:pl-72 ">
      <Header />
      <div className="px-5">
        <div className="relative block w-full">
          <Carousel />
        </div>
        <TagFilter />
        <OrgDirectoryGrid />
      </div>
    </main>
  );
};

export default Home;
