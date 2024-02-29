import { type api as API } from '@src/trpc/server';
import { api } from '@src/trpc/react';
import { type Row, type RowData, type Table } from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Officers = Awaited<ReturnType<typeof API.club.getOfficers.query>>;

type Props = {
  row: Row<Officers[number]>;
  column: { id: string };
  table: Table<Officers[number]>;
};

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export default function RoleDropDown({ row, column: { id }, table }: Props) {
  const router = useRouter();
  const { mutate } = api.admin.updateOfficer.useMutation({
    onSuccess: () => router.refresh(),
  });
  const originalVal = row.original.memberType;

  const [value, setValue] = useState(originalVal);

  function onBlur() {
    table.options.meta?.updateData(row.index, id, value);
    mutate({
      clubId: row.original.clubId,
      role: value,
      officerId: row.original.userId,
    });
  }

  useEffect(() => {
    setValue(originalVal);
  }, [originalVal]);

  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value as typeof value)}
      onBlur={onBlur}
    >
      <option value="President">President</option>
      <option value="Officer">Officer</option>
      <option value="Member">Member</option>
    </select>
  );
}
