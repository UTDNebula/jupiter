import AddOrg from '@src/components/admin/AddOrg';

export default function Page() {
  return (
    <div className="m-5 md:pl-72">
      <h1 className="text-center text-4xl font-bold text-black">
        Add Orgs to Carousel
      </h1>
      <AddOrg />
    </div>
  );
}
