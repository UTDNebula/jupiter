import FormCard from './FormCard';
import { type Session } from 'next-auth';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';

async function SettingsForm({ session }: { session: Session }) {
  const user = session.user;
  if (!user) return null;

  const clubs = await db.query.userMetadataToClubs.findMany({
    where: (joinTable) => eq(joinTable.userId, user.id),
    with: { club: true },
    columns: {
      clubId: false,
      userId: false,
    },
  });

  const formatted = clubs.map(({ club }) => club);

  return (
    <div className="m-auto w-full rounded-xl p-4">
      <div>
        <div className="h-24 rounded-t-3xl bg-gradient-to-r from-[#5A49F7] from-[4.36%] via-[#9403D8] via-[49.74%] to-[#FD9365] p-6" />
        <div className="bg-white p-6">
          <h1 className="py-2 text-3xl font-semibold">Settings</h1>
          <FormCard user={session.user} clubs={formatted} />
        </div>
<<<<<<< HEAD
      </form>
      <button
        type="submit"
        form="settings-form"
        className="mr-2 rounded-2xl bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600"
      >
        Save Changes
      </button>

      {isLoading && (
        <div className="fixed bottom-20 right-32 h-auto animate-pulse rounded-md border border-slate-200 bg-slate-50 p-2">
          Loading...
        </div>
      )}

      {isSuccess && (
        <div className="fixed bottom-20 right-32 h-auto rounded-md border border-green-200 bg-green-50 p-2">
          Success!
        </div>
      )}

      {isError && (
        <div className="fixed bottom-20 right-32 h-auto rounded-md border border-red-200 bg-red-50 p-2">
          Error
        </div>
      )}
    </>
=======
      </div>
    </div>
>>>>>>> develop
  );
}

export default SettingsForm;
