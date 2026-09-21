
import type {ReactNode} from "react";
import type { Column } from "../components/DataTable/types/types";

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

export function renderCell<T>(column: Column<T>, row: T): ReactNode {
  if (column.kind === "display") {
    return column.render(row);
  }

  const value = row[column.key];

  if (column.render) {
    return column.render(value, row);
  }

  return renderDefaultValue(value);
}

export function compareValues(firstValue: unknown, secondValue: unknown): number {
  if (typeof firstValue === "number" && typeof secondValue === "number") {
    return firstValue - secondValue;
  }

  if (typeof firstValue === "string" && typeof secondValue === "string") {
    return firstValue.localeCompare(secondValue);
  }

  return 0;
}

export function getSearchableValue(value: unknown): string | null {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return null;
}