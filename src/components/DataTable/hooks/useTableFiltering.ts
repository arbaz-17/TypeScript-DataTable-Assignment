import { useMemo, useState } from "react";

import type { SelectFilterUnion } from "../types/types";

import { getSearchableValue } from "../../../utils/helpers";

type UseTableFilteringProps<T> = {
  rows: T[];
  searchKey?: keyof T;
  filters?: SelectFilterUnion<T>[];
};

function useTableFiltering<T>({
  rows,
  searchKey,
  filters,
}: UseTableFilteringProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  function handleFilterChange(key: keyof T, selectedOption: string) {
    setFilterValues((currentValues) => ({
      ...currentValues,
      [String(key)]: selectedOption,
    }));
  }

  function clearFilters() {
    setSearchQuery("");
    setFilterValues({});
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

      return (
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
        }) ?? true
      );
    });
  }, [rows, searchKey, searchQuery, filters, filterValues]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    Object.values(filterValues).some((value) => value !== "");

  return {
    searchQuery,
    setSearchQuery,
    filterValues,
    handleFilterChange,
    clearFilters,
    filteredRows,
    hasActiveFilters,
  };
}

export default useTableFiltering;
