import type { ReactNode } from "react";

export type DataColumn<T, K extends keyof T> = {
  kind: "data";
  key: K;
  header: string;
  sortable?: boolean;
  searchable?: boolean;
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

export type DataTableProps<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string | number;
  onRowClick?: (row: T) => void;
};