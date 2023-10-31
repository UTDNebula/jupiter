import Header from '@src/components/Header';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <button onClick={() => router.back()} type="button">
          Back
        </button>
        <form>
          <div>
            <h1>Edit Contacts</h1>
          </div>
        </form>
      </div>
    </main>
  );
};
export default Page;
