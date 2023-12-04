import Header from '@src/components/BaseHeader';
import BackButton from '@src/components/BlueBackButton';
import EditOfficerForm from './EditOfficerForm';
import { api } from '@src/trpc/server';

export default async function Page({
  params: { clubId },
}: {
  params: { clubId: string };
}) {
  const officers = (await api.club.getOfficers.query({ id: clubId })).map(
    (officer) => {
      return {
        userId: officer.userId,
        name:
          officer.userMetadata.firstName + ' ' + officer.userMetadata.lastName,
        locked: officer.memberType == 'President',
        position: officer.memberType as 'President' | 'Officer',
        title: officer.title as string,
      };
    },
  );
  return (
    <main className="h-full md:pl-72">
      <Header />
      <div className="flex flex-col gap-y-2 px-5">
        <BackButton />
        <h1 className="text-2xl font-extrabold text-blue-primary">
          Edit club officers
        </h1>
        <EditOfficerForm clubId={clubId} officers={officers} />
      </div>
    </main>
  );
}
