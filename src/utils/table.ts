import { rankItem } from '@tanstack/match-sorter-utils';
import { type FilterFn } from '@tanstack/react-table';

export const fuzzyFilter: FilterFn<unknown> = (
  row,
  columnId,
  value,
  addMeta,
) => {
  const itemRank = rankItem(row.getValue(columnId), value as string);
  addMeta({ itemRank });
  return itemRank.passed;
};
