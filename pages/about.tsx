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
      <main className="md:pl-72">
        <Header />
        <div className="w-11/12 mx-auto">
          <h1 className="text-2xl font-medium text-slate-500 pl-10 pt-10">
            About us
          </h1>
          <div className="w-full bg-slate-100 mt-10 rounded-lg p-8">
            <h1 className="text-2xl font-medium text-slate-500">
              Project Jupiter
            </h1>
            <h3 className="font-light text-slate-500 mt-4">Project goal</h3>
            <p className="text-sm font-light text-slate-500 mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
              tenetur, consequatur quaerat quos rerum quia corporis aliquid
              saepe libero, quis ratione eligendi iure repudiandae voluptas?
              Ducimus, voluptatibus minus. Exercitationem, quam? Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Vero nemo explicabo
              repellendus, nisi sunt beatae culpa odit, alias, nulla ea ad
              ducimus id a! Eveniet repellat quas corporis. Atque, cumque?
              Totam, voluptatibus? Vero ratione, autem, enim a tempore sed
              voluptatem vitae quae praesentium provident iste at voluptate
              dolorum adipisci maiores? Officia vero eligendi quidem itaque eius
              expedita et illum laboriosam?
            </p>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-10">
          <h1 className="text-2xl font-medium text-slate-500 text-center">
            Our Team
          </h1>
        </div>
        <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
          {Array.from({ length: 8 }).map((_, key) => (
            <div
              key={key}
              className="h-40 bg-slate-100 mt-5 rounded-lg p-5 text-center"
            >
              <h1 className="text-2xl font-medium text-slate-500">Name</h1>
              <h3 className="font-light text-slate-500 mt-2">Position</h3>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default About;
