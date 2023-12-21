import { getServerAuthSession } from '@src/server/auth';
import { db } from '@src/server/db';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page() {
  const session = await getServerAuthSession();
  if (!session) notFound();
  const userId = session.user.id;
  const isAdmin = await db.query.admin.findFirst({
    where: (admin) => eq(admin.userId, userId),
  });
  if (!isAdmin) notFound();

  return (
    <div className="m-5 md:pl-72">
      <h1 className="text-center text-4xl font-bold text-black">
        Jupiter Dashboard
      </h1>
      <div className="flex justify-center gap-x-5 pt-20">
        <Link
          href="/admin/orgs"
          className="rounded-md bg-slate-300 px-2 py-1 text-blue-500 transition-colors hover:bg-slate-400 hover:text-blue-600"
        >
          Manage Orgs
        </Link>
        <Link
          href="/admin/users"
          className="rounded-md bg-slate-300 px-2 py-1 text-blue-500 transition-colors hover:bg-slate-400 hover:text-blue-600"
        >
          Manage Users
        </Link>
      </div>
    </div>
  );
}
