import Image from 'next/image';
import gradientBG from 'public/images/landingGradient.png';
import Sidebar from '../nav/Sidebar';
import { ClubSearchBar } from '../searchBar/ClubSearchBar';
import ExploreButton from './ExploreButton';
// screen sized bb
const LandingPage = () => {
  return (
    <section className="relative h-screen w-screen">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={gradientBG}
          fill
          sizes="100vw"
          alt="Gradient Background for landing page"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 z-10 h-full w-full bg-black/10"></div>
      <div
        title="landing page content"
        className="absolute inset-0 z-10 w-full"
      >
        <div className="z-20 flex h-20 w-full flex-row items-center">
          <Sidebar hamburger="white" />
          <div>
            <Image
              src="/nebula-logo.png"
              alt=""
              width={60}
              height={60}
              className="mr-1.5"
              priority
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center">
        <h2 className="pointer-events-auto mb-2 max-w-2xl text-xl text-white md:text-3xl">
          Find your Community
        </h2>
        <h1 className="pointer-events-auto mb-4 max-w-3xl px-5 text-center font-sans text-2xl font-semibold text-white md:px-0 md:text-6xl">
          Discover the Best Clubs and Organizations at UTD
        </h1>
        <ClubSearchBar />
      </div>
      <ExploreButton />
    </section>
  );
};

export default LandingPage;
