# Datasets

## 1. Overview

This folder contains the sample datasets used to demonstrate the reusable `DataTable<T>` component with different row types. The data is kept separate from the table logic so the component stays generic and domain-independent.

## 2. Files

### `projects.ts`
Contains the sample `Project[]` dataset used by the Projects table.

The records include:
- `id`
- `name`
- `status`
- `priority`
- `createdAt`

The dataset includes different statuses, priorities, and dates so sorting, searching, filtering, and custom cell rendering can be tested.

### `users.ts`
Contains the sample `User[]` dataset used by the Users table.

The records include:
- `id`
- `name`
- `email`
- `role`
- `active`

The dataset includes different roles and active states to demonstrate that the same generic table works with a different row structure.

## 3. Key Concepts

These files provide typed sample data that follows the domain models defined in `src/types`. Each exported array is explicitly typed, such as `Project[]` or `User[]`, allowing TypeScript to validate every record against its corresponding model.
