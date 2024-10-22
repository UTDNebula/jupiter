'use client';

import { api } from '@src/trpc/react';
import { UserSearchBar } from '../searchBar/UserSearchBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AdminState = {
  name: string;
  userId:string;
};

export default function AddAdmin() {
  const router = useRouter();
  const { mutate } = api.admin.addAdmin.useMutation({
    onSuccess: () => {
      router.refresh();
      setPerson(null);
    },
  });

  const [toAdd, setPerson] = useState<AdminState | null>(null);

  return (
    <div className="container">
      <h1>Add Admin</h1>
      <div className="flex p-3">
        <UserSearchBar
          passUser={(user) =>
            setPerson({
              name: user.name,
              userId:user.id, // Set selected role when user is selected
            })
          }
        />
      </div>
      <div className="flex items-center p-3">
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            if (!toAdd) return;
            mutate({
              userId:toAdd.userId
            });
          }}
          disabled={!toAdd || !toAdd.name}
        >
          Confirm
        </button>
        {toAdd && toAdd.name && (
          <span className="ml-3">
            Adding <strong>{toAdd.name}</strong> as admin
          </span>
        )}
      </div>
    </div>
  );
}
