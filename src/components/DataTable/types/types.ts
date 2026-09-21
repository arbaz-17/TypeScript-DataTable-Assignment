import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export type SortState<T> = {
  key: keyof T;
  direction: SortDirection;
};

export type DataColumn<T, K extends keyof T> = {
  kind: "data";
  key: K;
  header: string;
  sortable?: boolean;
  render?: (value: T[K], row: T) => ReactNode;
};

export type DataColumnUnion<T> = {
  [K in keyof T]: DataColumn<T, K>;
}[keyof T];

export type DisplayColumn<T> = {
  kind: "display";
  id: string;
  header: string;
  render: (row: T) => ReactNode;
};

export type Column<T> = DataColumnUnion<T> | DisplayColumn<T>;

export type FilterOption<TValue> = {
  label: string;
  value: TValue;
};

export type SelectFilter<T, K extends keyof T> = {
  key: K;
  label: string;
  options: readonly FilterOption<T[K]>[];
};

export type SelectFilterUnion<T> = {
  [K in keyof T]: SelectFilter<T, K>;
}[keyof T];

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];

  getRowId: (row: T) => string | number;

  searchKey?: keyof T;

  filters?: SelectFilterUnion<T>[];

  onRowClick?: (row: T) => void;
};
