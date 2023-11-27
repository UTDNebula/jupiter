import Header from '@src/components/BaseHeader';
import BackButton from '@src/components/backButton';

export default function Page() {
  return (
    <main className="md:pl-72">
      <Header />
      <BackButton />
      <h1>Edit club officers</h1>
    </main>
  );
}
