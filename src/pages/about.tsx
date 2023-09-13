import Head from 'next/head';
import Header from '../components/Header';

const About = () => {
  return (
    <>
      <Head>
        <title>Jupiter</title>
        <meta name="description" content="About - Jupiter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="md:pl-72 pb-10">
        <Header />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-500 my-10">About us</h1>
          <div className="bg-slate-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-slate-500 mb-4">
              Project Jupiter
            </h2>
            <h3 className="text-xl text-slate-500 mb-2">Our Goal</h3>
            <p className="text-sm font-light text-slate-500 mt-2 space-y-4">
              Jupiter is a user-friendly platform that can be utilized by
              students to seamlessly join school clubs. This tool allows
              students to browse through the list of available clubs, their
              activities, and objectives, all in one place. Students can easily
              sign up for clubs that interest them and receive real-time updates
              on events, meetings, and other activities organized by the clubs.
              The platform also enables club leaders to manage and promote their
              clubs more efficiently, keeping members informed about important
              details and facilitating communication between members.
              <br />
              <br />
              Jupiter comes with several features that make it an ideal tool for
              school club management. For instance, the platform provides a
              comprehensive dashboard that enables club leaders to track
              attendance, monitor club performance, and collect feedback from
              members. The tool also integrates with the school&apos;s social
              media pages and website, making it easy for students to discover
              clubs that match their interests. With Jupiter, students can
              easily find and join clubs, and club leaders can manage their
              clubs more effectively, leading to more successful and fulfilling
              club experiences for everyone involved.
            </p>
          </div>

          <div className="mt-16">
            <h1 className="text-3xl font-bold text-slate-500 text-center mb-10">
              Our Team
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, key) => (
                <div
                  key={key}
                  className="h-48 bg-slate-100 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-medium text-slate-500 mb-2">
                    Name
                  </h2>
                  <h3 className="text-lg text-slate-500">Position</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
