# DataTable Types

## 1. Overview

This folder contains the core TypeScript type architecture for the reusable `DataTable<T>` component. It defines how rows, columns, sorting, filters, custom cell renderers, and callbacks remain strongly typed while allowing the same table component to work with different data models.

## 2. Files

### `types.ts`
Defines the complete type system used by `DataTable<T>`:

- `SortDirection` and `SortState<T>` for typed sorting.
- `DataColumn<T, K>` for property-backed columns.
- `DataColumnUnion<T>` to preserve the relationship between a selected key and its exact value type.
- `DisplayColumn<T>` for custom columns such as Actions.
- `Column<T>` as the union of data and display columns.
- `FilterOption<TValue>`, `SelectFilter<T, K>`, and `SelectFilterUnion<T>` for strongly typed dropdown filters.
- `DataTableProps<T>` for the component's generic props, including rows, columns, row identity, search configuration, filters, and row callbacks.

## 3. Type Responsibilities / Key Concepts

This file demonstrates the main TypeScript concepts used in the assignment:

- **Generics** — `T` represents the row type and `K` represents a valid key of that row.
- **`keyof`** — restricts column, sort, search, and filter keys to valid properties of `T`.
- **Indexed access types** — `T[K]` keeps cell values and filter values connected to the selected property.
- **Mapped unions** — `DataColumnUnion<T>` and `SelectFilterUnion<T>` preserve exact key/value relationships for every property.
- **Discriminated unions** — `kind: "data" | "display"` allows safe narrowing between normal and custom columns.
- **Typed callbacks** — render functions, `getRowId`, and `onRowClick` all receive the correct generic row type.
- **No `any`** — flexibility is achieved through generics instead of removing type safety.

