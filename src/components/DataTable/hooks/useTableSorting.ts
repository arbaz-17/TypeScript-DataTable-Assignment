import { useMemo, useState } from "react";

import type { SortState } from "../types/types";

import { compareValues } from "../../../utils/helpers";

function useTableSorting<T>(rows: T[]) {
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

  const sortedRows = useMemo(() => {
    if (!sortState) {
      return rows;
    }

    return [...rows].sort((firstRow, secondRow) => {
      const firstValue = firstRow[sortState.key];

      const secondValue = secondRow[sortState.key];

      const comparison = compareValues(firstValue, secondValue);

      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [rows, sortState]);

  return {
    sortState,
    handleSort,
    sortedRows,
  };
}

export default useTableSorting;
