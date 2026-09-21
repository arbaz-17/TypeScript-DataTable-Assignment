# TypeScript DataTable — Week 9 Assignment

## Overview

A reusable generic `DataTable<T>` built with React, TypeScript, and Vanilla CSS as part of Week 9 of the frontend internship.

The assignment focuses on building one table component that can work with different row types while preserving strong type safety. It demonstrates typed rows and columns, custom cells, sorting, name-based search, dropdown filters, typed callbacks, reusable custom hooks, and reuse across both `Project` and `User` datasets without using `any`.

## Module Responsibility

### `src/components/DataTable`
Contains the reusable generic table implementation.

Responsibilities include:
- Rendering typed rows and columns.
- Supporting normal data columns and custom display columns.
- Connecting table UI with the reusable filtering and sorting hooks.
- Rendering custom cells and action controls.
- Exposing typed callbacks such as `getRowId` and `onRowClick`.
- Handling empty states, result counts, and accessible sortable headers.

### `src/components/DataTable/hooks`
Contains the reusable custom hooks used by the table.

#### `useTableFiltering<T>`
Responsible for:
- Managing the search query.
- Managing selected dropdown filter values.
- Applying name-based search.
- Applying typed dropdown filters.
- Returning the derived `filteredRows`.
- Clearing active search and filter controls.
- Preserving the generic row type `T` throughout the filtering flow.

#### `useTableSorting<T>`
Responsible for:
- Managing the generic `SortState<T>`.
- Toggling ascending and descending sort direction.
- Sorting the already filtered rows.
- Returning the derived `sortedRows`.
- Preserving `keyof T` for strongly typed sorting keys.

Keeping filtering and sorting in focused custom hooks reduces the responsibility of `DataTable.tsx` and separates reusable table behavior from rendering.

### `src/components/DataTable/types`
Contains the TypeScript architecture used by the table, including generic column types, sort types, typed filter definitions, mapped unions, and `DataTableProps<T>`.

### `src/types`
Contains the domain models used by the demo datasets, including `Project`, `ProjectStatus`, `ProjectPriority`, `User`, and `UserRole`.

### `src/data`
Contains the sample `Project[]` and `User[]` datasets used to demonstrate generic reuse.

## Week 9 Concepts Used

### Generics
`DataTable<T>` and the custom hooks use a generic type parameter so the same table behavior can work with different row models such as `Project` and `User` while preserving their exact types.

### Generic Type Parameters
`T` represents the complete row type, while `K` represents a specific property key of that row. These parameters allow the table, hooks, columns, and filters to adapt to the data supplied by the parent.

### Generic Constraints
`K extends keyof T` ensures that a column or filter key must be a real property of the current row type instead of an arbitrary string.

### `keyof`
`keyof T` produces the valid property names of the current row model. It is used for column keys, sorting keys, search keys, and filter keys.

### Indexed Access Types — `T[K]`
`T[K]` gives the exact value type associated with a selected key. For example, `User["active"]` becomes `boolean`, allowing custom cell renderers and filters to remain precisely typed.

### Mapped Types
Mapped types are used to create a correctly typed column or filter variant for every property in `T`. This helps preserve the relationship between each key and its corresponding value type.

### Union Types
Union types combine multiple valid possibilities, such as data columns and display columns, or ascending and descending sort directions.

### Literal Types
Literal unions restrict values to known options such as `"planned" | "active" | "completed"` or `"admin" | "developer" | "viewer"`.

### Discriminated Unions
Columns use `kind: "data"` and `kind: "display"` so TypeScript can safely narrow each column type and expose the correct properties and renderer signature.

### Typed React Props
`DataTableProps<T>` defines strongly typed component inputs such as rows, columns, search configuration, filters, row identity, and callbacks.

### Typed Callbacks
Callbacks such as `getRowId`, `onRowClick`, and custom cell renderers receive the correct row or property type based on `T` and `T[K]`.

### Custom Hooks
`useTableFiltering<T>` and `useTableSorting<T>` extract stateful table behavior from the UI component. They keep sorting and filtering reusable, focused, and strongly typed while allowing `DataTable.tsx` to concentrate mainly on rendering and interaction.

### Type Inference
TypeScript infers types in many places without manual annotations, including row callback parameters, event handlers, hook return values, and the generic type used by each `DataTable` instance.

### Type Narrowing
Runtime checks such as `typeof value === "string"` narrow `unknown` values before they are rendered, searched, or compared.

### `unknown`
`unknown` is used where a generic property may contain different runtime value types. Unlike `any`, it requires the value to be narrowed before it can be used safely.

### React State with TypeScript
Search text, selected filters, and sorting state are managed with typed `useState` values inside the custom hooks, including the generic `SortState<T>`.

### Derived State
Filtered and sorted rows are calculated from the original rows and current UI state rather than being stored separately, avoiding duplicated and inconsistent state.

### `useMemo`
`useMemo` is used inside the filtering and sorting hooks for derived row calculations so they are recomputed only when their relevant dependencies change.

### Avoiding `any`
The assignment does not use `any` to make the table flexible. Generics, `keyof`, indexed access types, narrowing, and `unknown` preserve flexibility without losing type safety.

The central type relationship in the assignment is:

```ts
K extends keyof T
T[K]
```

This ensures that a selected property key and its corresponding value type remain connected throughout columns, custom cells, filters, and reusable hook logic.

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/arbaz-17/TypeScript-DataTable-Assignment.git
cd TypeScript-DataTable-Assignment
npm install
npm run dev
```

## Demo Link

Demo link will be added after deployment.
