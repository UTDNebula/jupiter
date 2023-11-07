import Header from '@src/components/BaseHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Jupiter',
  description: 'About Jupiter',
  alternates: {
    canonical: 'https://jupiter.utdnebula.com/about',
  },
  openGraph: {
    url: 'https://jupiter.utdnebula.com/about',
    description: 'About Jupiter',
  },
};

const About = () => {
  return (
    <main className="h-full md:pl-72">
      <Header />
      <div className="mx-6 h-full">
        <h1 className="p-2 py-12 text-2xl font-bold text-slate-500">
          About us
        </h1>
        <div className="rounded-lg bg-slate-100 p-8 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-slate-500">
            Project Jupiter
          </h2>
          <h3 className="mb-2 text-base text-slate-500">Our Goal</h3>
          <p className="mt-2 space-y-4 text-sm font-light text-slate-500">
            Jupiter is a user-friendly platform that can be utilized by students
            to seamlessly join school clubs. This tool allows students to browse
            through the list of available clubs, their activities, and
            objectives, all in one place. Students can easily sign up for clubs
            that interest them and receive real-time updates on events,
            meetings, and other activities organized by the clubs. The platform
            also enables club leaders to manage and promote their clubs more
            efficiently, keeping members informed about important details and
            facilitating communication between members.
            <br />
            <br />
            Jupiter comes with several features that make it an ideal tool for
            school club management. For instance, the platform provides a
            comprehensive dashboard that enables club leaders to track
            attendance, monitor club performance, and collect feedback from
            members. The tool also integrates with the school&apos;s social
            media pages and website, making it easy for students to discover
            clubs that match their interests. With Jupiter, students can easily
            find and join clubs, and club leaders can manage their clubs more
            effectively, leading to more successful and fulfilling club
            experiences for everyone involved.
          </p>
        </div>
        <div className="mt-16 py-3">
          <h1 className="mb-10 text-center text-3xl font-bold text-slate-500">
            Our Team
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, key) => (
              <div
                key={key}
                className="rounded-lg bg-slate-100 p-5 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <h2 className="mb-2 text-xl font-medium text-slate-500">
                  Name
                </h2>
                <h3 className="text-lg text-slate-500">Position</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
