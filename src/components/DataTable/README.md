# DataTable Component

## 1. Overview

This folder contains the reusable `DataTable<T>` component responsible for rendering typed tabular data with sorting, name-based search, dropdown filters, custom cells, row callbacks, empty states, and accessible table controls.

## 2. Files

### `DataTable.tsx`
Implements the generic table behavior and UI.

Main responsibilities include:

- Rendering generic rows and columns.
- Rendering default values or custom cell content.
- Managing internal search, filter, and sort state.
- Filtering rows by the configured `searchKey`.
- Applying typed dropdown filters.
- Sorting supported string and number values.
- Rendering sortable headers with `aria-sort`.
- Generating unique form-control IDs with `useId`.
- Rendering empty states and result counts.
- Calling typed `getRowId` and `onRowClick` callbacks.

## 3. Key Concepts

The component demonstrates several important React and TypeScript concepts:

- **Generic component design** — `DataTable<T>` works with different row models without knowing their domain.
- **Indexed property access** — values are accessed safely through typed keys such as `row[column.key]`.
- **Type narrowing** — `unknown` values are narrowed before rendering, searching, or comparing.
- **Derived state** — filtered and sorted rows are calculated from source rows and UI state rather than stored separately.
- **`useMemo`** — memoizes filtering and sorting calculations based on their dependencies.
- **Controlled inputs** — search and dropdown filters are controlled by React state.
- **Discriminated unions** — data and display columns are handled according to `column.kind`.
- **Accessibility** — labels, unique IDs, semantic table markup, sortable buttons, `aria-sort`, and live result counts are included.
