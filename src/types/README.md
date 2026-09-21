# Types

## 1. Overview

This folder contains the domain type definitions used by the application. It defines the shape of the data passed into the generic `DataTable<T>` and keeps project-specific models separate from the reusable table component.

## 2. Files

### `project.ts`
Defines the project-related types:

- `ProjectStatus` — allowed project statuses: `planned`, `active`, and `completed`.
- `ProjectPriority` — allowed priority levels: `low`, `medium`, and `high`.
- `Project` — describes a project row with `id`, `name`, `status`, `priority`, and `createdAt`.

### `user.ts`
Defines the user-related types:

- `UserRole` — allowed roles: `admin`, `developer`, and `viewer`.
- `User` — describes a user row with `id`, `name`, `email`, `role`, and `active`.

## 3. Key Concepts

These types provide strongly typed domain models for the two datasets used by the application. Literal union types restrict fields such as status, priority, and role to known values, while `Project` and `User` provide the row types used by `DataTable<T>`.

