import { useId, useMemo, useState } from "react";

import type { KeyboardEvent, ReactNode } from "react";

import type { Column, DataTableProps, SortState } from "./types/types";

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
  searchKey,
  filters,
  onRowClick,
}: DataTableProps<T>) {
  const searchId = useId();
  const filterGroupId = useId();

  const [searchQuery, setSearchQuery] = useState("");

  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

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

  function handleFilterChange(key: keyof T, selectedOption: string) {
    setFilterValues((currentValues) => ({
      ...currentValues,
      [String(key)]: selectedOption,
    }));
  }

  function handleClearFilters() {
    setSearchQuery("");
    setFilterValues({});
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, row: T) {
    if (!onRowClick) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRowClick(row);
    }
  }

  const filteredRows = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch = (() => {
        if (!searchKey || !normalizedQuery) {
          return true;
        }

        const searchableValue = getSearchableValue(row[searchKey]);

        if (searchableValue === null) {
          return false;
        }

        return searchableValue.toLowerCase().includes(normalizedQuery);
      })();

      if (!matchesSearch) {
        return false;
      }

      const matchesFilters =
        filters?.every((filter) => {
          const filterId = String(filter.key);

          const selectedIndex = filterValues[filterId];

          if (selectedIndex === undefined || selectedIndex === "") {
            return true;
          }

          const option = filter.options[Number(selectedIndex)];

          if (!option) {
            return true;
          }

          return Object.is(row[filter.key], option.value);
        }) ?? true;

      return matchesFilters;
    });
  }, [rows, searchKey, searchQuery, filters, filterValues]);

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

  const hasActiveControls =
    searchQuery.trim() !== "" ||
    Object.values(filterValues).some((value) => value !== "");

  return (
    <div className="data-table">
      <div className="data-table__toolbar">
        {searchKey && (
          <div className="data-table__field data-table__search">
            <label htmlFor={searchId}>Search by {String(searchKey)}</label>

            <input
              id={searchId}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search by ${String(searchKey)}...`}
            />
          </div>
        )}

        {filters?.map((filter) => {
          const filterId = String(filter.key);

          const selectId = `${filterGroupId}-${filterId}`;

          return (
            <div className="data-table__field" key={filterId}>
              <label htmlFor={selectId}>{filter.label}</label>

              <select
                id={selectId}
                value={filterValues[filterId] ?? ""}
                onChange={(event) =>
                  handleFilterChange(filter.key, event.target.value)
                }
              >
                <option value="">All {filter.label}</option>

                {filter.options.map((option, index) => (
                  <option key={String(option.value)} value={String(index)}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}

        <button
          className="data-table__reset"
          type="button"
          onClick={handleClearFilters}
          disabled={!hasActiveControls}
        >
          Clear filters
        </button>
      </div>

      <div className="data-table__surface">
        <div className="data-table__scroll">
          <table>
            <thead>
              <tr>
                {columns.map((column) => {
                  const columnId =
                    column.kind === "data" ? String(column.key) : column.id;

                  if (column.kind === "data" && column.sortable) {
                    const isActiveSort = sortState?.key === column.key;

                    const ariaSort = !isActiveSort
                      ? "none"
                      : sortState.direction === "asc"
                        ? "ascending"
                        : "descending";

                    const sortIndicator = isActiveSort
                      ? sortState.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕";

                    return (
                      <th key={columnId} scope="col" aria-sort={ariaSort}>
                        <button
                          className="data-table__sort"
                          type="button"
                          onClick={() => handleSort(column.key)}
                        >
                          <span>{column.header}</span>

                          <span
                            className="data-table__sort-icon"
                            aria-hidden="true"
                          >
                            {sortIndicator}
                          </span>
                        </button>
                      </th>
                    );
                  }

                  return (
                    <th key={columnId} scope="col">
                      {column.header}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {sortedRows.length > 0 ? (
                sortedRows.map((row) => (
                  <tr
                    key={getRowId(row)}
                    data-clickable={onRowClick ? "true" : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    onKeyDown={(event) => handleRowKeyDown(event, row)}
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
                  <td className="data-table__empty" colSpan={columns.length}>
                    {rows.length === 0
                      ? "No data available."
                      : "No matching results."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="data-table__footer" aria-live="polite">
          Showing {sortedRows.length} of {rows.length} rows
        </div>
      </div>
    </div>
  );
}

export default DataTable;
