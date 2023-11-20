import Link from 'next/link';

const Page = ({ params }: { params: { clubId: string } }) => {
  return (
    <>
      <div className="flex flex-row gap-x-1 rounded-lg bg-white p-2 shadow-sm">
        <Link
          href={`/directory/${params.clubId}/edit`}
          className="rounded-md bg-blue-primary p-1 font-semibold text-white"
        >
          Edit Club Data
        </Link>
        <Link
          href={`/directory/${params.clubId}/edit/officers`}
          className="rounded-md bg-blue-primary p-1 font-semibold text-white"
        >
          Manage Officers
        </Link>
        <button className="rounded-md bg-blue-primary p-1 font-semibold text-white">
          View members
        </button>
      </div>
    </>
  );
};
export default Page;
