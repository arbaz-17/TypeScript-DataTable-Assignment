import { useMemo, useState } from "react";

import type { ReactNode } from "react";

import type { Column, DataTableProps, SortState } from "./types";

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

function renderCell<T>(column: Column<T>, row: T): ReactNode {
  if (column.kind === "display") {
    return column.render(row);
  }

  const value = row[column.key];

  if (column.render) {
    return column.render(value, row);
  }

  return renderDefaultValue(value);
}

function compareValues(firstValue: unknown, secondValue: unknown): number {
  if (typeof firstValue === "number" && typeof secondValue === "number") {
    return firstValue - secondValue;
  }

  if (typeof firstValue === "string" && typeof secondValue === "string") {
    return firstValue.localeCompare(secondValue);
  }

  return 0;
}

function getSearchableValue(value: unknown): string | null {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return null;
}

function DataTable<T>({
  rows,
  columns,
  getRowId,
  onRowClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const [sortState, setSortState] = useState<SortState<T> | null>(null);

  function handleSort(key: keyof T) {
    setSortState((currentSort) => {
      if (currentSort?.key === key) {
        return {
          key,
          direction: currentSort.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        key,
        direction: "asc",
      };
    });
  }

  const filteredRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) =>
      columns.some((column) => {
        if (column.kind !== "data" || !column.searchable) {
          return false;
        }

        const value = row[column.key];

        const searchableValue = getSearchableValue(value);

        if (searchableValue === null) {
          return false;
        }

        return searchableValue.toLowerCase().includes(normalizedQuery);
      }),
    );
  }, [rows, columns, searchQuery]);

  const sortedRows = useMemo(() => {
    if (!sortState) {
      return filteredRows;
    }

    return [...filteredRows].sort((firstRow, secondRow) => {
      const firstValue = firstRow[sortState.key];

      const secondValue = secondRow[sortState.key];

      const comparison = compareValues(firstValue, secondValue);

      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredRows, sortState]);

  return (
    <div>
      <div>
        <label htmlFor="table-search">Search</label>

        <input
          id="table-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search..."
        />
      </div>

      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const columnId =
                column.kind === "data" ? String(column.key) : column.id;

              if (column.kind === "data" && column.sortable) {
                const isActiveSort = sortState?.key === column.key;

                const sortIndicator = isActiveSort
                  ? sortState.direction === "asc"
                    ? " ↑"
                    : " ↓"
                  : "";

                return (
                  <th key={columnId}>
                    <button
                      type="button"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.header}
                      {sortIndicator}
                    </button>
                  </th>
                );
              }

              return <th key={columnId}>{column.header}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {sortedRows.length > 0 ? (
            sortedRows.map((row) => (
              <tr
                key={getRowId(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((column) => {
                  const columnId =
                    column.kind === "data" ? String(column.key) : column.id;

                  return <td key={columnId}>{renderCell(column, row)}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No matching results.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
