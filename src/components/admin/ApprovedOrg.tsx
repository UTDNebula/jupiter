import { type SelectClub } from '@src/server/db/models';
import AddOfficer from './AddOfficer';
import OfficerTable from './OfficerTable';
import OrgDescription from './OrgDescription';
import { api } from '@src/trpc/server';
import ChangeOrgStatus from './ChangeOrgStatus';

type Props = { org: SelectClub };
export default async function AcceptedOrg({ org }: Props) {
  const officers = await api.club.getOfficers({ id: org.id });

  return (
    <>
      <h2 className="text-center text-2xl font-bold">Officers</h2>
      <div className="flex items-center justify-between">
        <AddOfficer clubId={org.id} />
        <OrgDescription club={org} />
      </div>
      <OfficerTable officers={officers} />
      <ChangeOrgStatus status={org.approved} orgId={org.id} />
    </>
  );
}
