import Header from '../components/Header';
import Carousel from '../components/Carousel';
import TagFilter from '../components/TagFilter';
import OrgDirectoryGrid from '../components/OrgDirectoryGrid';

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
