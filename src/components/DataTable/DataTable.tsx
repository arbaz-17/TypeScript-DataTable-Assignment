import { useId } from "react";
import type { KeyboardEvent } from "react";
import type { DataTableProps } from "./types/types";

import { renderCell } from "../../utils/helpers";

import useTableFiltering from "./hooks/useTableFiltering";
import useTableSorting from "./hooks/useTableSorting";

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

  const {
    searchQuery,
    setSearchQuery,
    filterValues,
    handleFilterChange,
    clearFilters,
    filteredRows,
    hasActiveFilters,
  } = useTableFiltering({
    rows,
    searchKey,
    filters,
  });

  const { sortState, handleSort, sortedRows } = useTableSorting(filteredRows);

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
          onClick={clearFilters}
          disabled={!hasActiveFilters}
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
