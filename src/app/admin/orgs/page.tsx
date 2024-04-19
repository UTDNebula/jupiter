import OrgTable from '@src/components/admin/OrgTable';
import { api } from '@src/trpc/server';

export default async function Page() {
  const clubs = await api.admin.allOrgs();
  return (
    <div className="m-5 md:pl-72">
      <OrgTable clubs={clubs} />
    </div>
  );
}
