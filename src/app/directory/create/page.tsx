import Header from '@src/components/BaseHeader';
import CreateClubForm from './createForm';

export default function Page() {
  return (
    <main>
      <div className="md:pl-72">
        <Header />
        <CreateClubForm />
      </div>
    </main>
  );
}
