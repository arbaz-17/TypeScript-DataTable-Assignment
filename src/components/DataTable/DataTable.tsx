import type { ReactNode } from "react";

import type { DataTableProps } from "./types";

function renderDefaultValue(value: unknown): ReactNode {
  if (value === null || value === undefined) {
    return "—";
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return "—";
}

function DataTable<T>({
  rows,
  columns,
  getRowId,
}: DataTableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => {
            const columnId =
              column.kind === "data"
                ? String(column.key)
                : column.id;

            return <th key={columnId}>{column.header}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={getRowId(row)}>
            {columns.map((column) => {
              const columnId =
                column.kind === "data"
                  ? String(column.key)
                  : column.id;

              return (
                <td key={columnId}>
                  {column.kind === "data"
                    ? renderDefaultValue(row[column.key])
                    : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;