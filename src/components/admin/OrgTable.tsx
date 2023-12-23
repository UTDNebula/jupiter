'use client';
import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type Row,
  type ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import Filter from './Filter';
import { api } from '@src/trpc/react';
import { useRouter } from 'next/navigation';
import { type Club, fuzzyFilter } from '@src/utils/table';

export default function OrgTable({ clubs }: { clubs: Club[] }) {
  const router = useRouter();
  const parentRef = useRef<HTMLDivElement>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { mutate } = api.admin.deleteOrg.useMutation({
    onSuccess: () => router.refresh(),
  });

  const columns = useMemo<ColumnDef<Club>[]>(
    () => [
      {
        id: 'view',
        cell: ({ row }) => (
          <Link
            href={`orgs/${row.original.id}`}
            className="rounded-md bg-slate-300 px-2 py-1 text-blue-500 transition-colors hover:bg-slate-400 hover:text-blue-600"
            target="_blank"
          >
            View
          </Link>
        ),
        size: 25,
      },
      {
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        sortingFn: (a, b) => a.original.name.localeCompare(b.original.name),
        filterFn: fuzzyFilter,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'tags',
        cell: (info) => {
          const tags = info.getValue() as string[];
          return (
            <div className="flex items-center space-x-1">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-gray-200 px-2 py-1 text-center text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        id: 'delete',
        cell: ({ row }) => (
          <button
            onClick={() => mutate({ id: row.original.id })}
            className="rounded-md bg-slate-300 px-2 py-1 text-red-600 transition-colors hover:bg-slate-400 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete
          </button>
        ),
        size: 25,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: clubs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  return (
    <div ref={parentRef} className="container mx-auto p-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-slate-100 text-xs uppercase text-slate-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-6 py-3"
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: `font-semibold ${
                                header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : ''
                              }`,
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const row = rows[virtualRow.index] as Row<Club>;
              return (
                <tr
                  key={row.id}
                  className="bg-slate border-b transition-colors hover:bg-slate-100"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="px-6 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
