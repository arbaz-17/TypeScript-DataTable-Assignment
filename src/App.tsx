import DataTable from "./components/DataTable/DataTable";

import type { Column, SelectFilterUnion } from "./components/DataTable/types/types";

import type { Project } from "./types/project";
import type { User } from "./types/user";

import { projects } from "./data/projects";
import { users } from "./data/users";

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* -------------------------------- */
/* Project callbacks                */
/* -------------------------------- */

function handleProjectClick(project: Project) {
  console.log("Selected project:", project);
}

function handleEditProject(project: Project) {
  console.log("Edit project:", project);
}

function handleDeleteProject(project: Project) {
  console.log("Delete project:", project);
}

/* -------------------------------- */
/* User callbacks                   */
/* -------------------------------- */

function handleUserClick(user: User) {
  console.log("Selected user:", user);
}

function handleEditUser(user: User) {
  console.log("Edit user:", user);
}

function handleDeleteUser(user: User) {
  console.log("Delete user:", user);
}

/* -------------------------------- */
/* Project columns                  */
/* -------------------------------- */

const projectColumns: Column<Project>[] = [
  {
    kind: "data",
    key: "name",
    header: "Project Name",
    sortable: true,
  },
  {
    kind: "data",
    key: "status",
    header: "Status",
    render: (status) => (
      <span className={`badge badge--${status}`}>{formatLabel(status)}</span>
    ),
  },
  {
    kind: "data",
    key: "priority",
    header: "Priority",
    render: (priority) => (
      <span className={`badge badge--${priority}`}>
        {formatLabel(priority)}
      </span>
    ),
  },
  {
    kind: "data",
    key: "createdAt",
    header: "Created At",
    sortable: true,
    render: (createdAt) => <time dateTime={createdAt}>{createdAt}</time>,
  },
  {
    kind: "display",
    id: "actions",
    header: "Actions",
    render: (project) => (
      <div className="table-actions">
        <button
          className="table-action"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleEditProject(project);
          }}
        >
          Edit
        </button>

        <button
          className="table-action table-action--danger"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteProject(project);
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
];

/* -------------------------------- */
/* Project filters                  */
/* -------------------------------- */

const projectFilters: SelectFilterUnion<Project>[] = [
  {
    key: "status",
    label: "Status",
    options: [
      {
        label: "Planned",
        value: "planned",
      },
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Completed",
        value: "completed",
      },
    ],
  },
  {
    key: "priority",
    label: "Priority",
    options: [
      {
        label: "Low",
        value: "low",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "High",
        value: "high",
      },
    ],
  },
];

/* -------------------------------- */
/* User columns                     */
/* -------------------------------- */

const userColumns: Column<User>[] = [
  {
    kind: "data",
    key: "name",
    header: "Name",
    sortable: true,
  },
  {
    kind: "data",
    key: "email",
    header: "Email",
    sortable: true,
  },
  {
    kind: "data",
    key: "role",
    header: "Role",
    render: (role) => (
      <span className={`badge badge--${role}`}>{formatLabel(role)}</span>
    ),
  },
  {
    kind: "data",
    key: "active",
    header: "Status",
    render: (active) => (
      <span className={`badge ${active ? "badge--active" : "badge--inactive"}`}>
        {active ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    kind: "display",
    id: "actions",
    header: "Actions",
    render: (user) => (
      <div className="table-actions">
        <button
          className="table-action"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleEditUser(user);
          }}
        >
          Edit
        </button>

        <button
          className="table-action table-action--danger"
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteUser(user);
          }}
        >
          Delete
        </button>
      </div>
    ),
  },
];

/* -------------------------------- */
/* User filters                     */
/* -------------------------------- */

const userFilters: SelectFilterUnion<User>[] = [
  {
    key: "role",
    label: "Role",
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "Developer",
        value: "developer",
      },
      {
        label: "Viewer",
        value: "viewer",
      },
    ],
  },
];

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <span className="app-eyebrow">TypeScript DataTable Assignment - Optimus Fox</span>

        <h1>Generic DataTable</h1>

        <p>
          A reusable, type-safe React DataTable with sorting, filtering, custom
          cells and typed callbacks.
        </p>
      </header>

      <section className="data-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Dataset 01</span>

            <h2>Projects</h2>
          </div>

          <span className="section-count">{projects.length} projects</span>
        </div>

        <DataTable
          rows={projects}
          columns={projectColumns}
          searchKey="name"
          filters={projectFilters}
          getRowId={(project) => project.id}
          onRowClick={handleProjectClick}
        />
      </section>

      <section className="data-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Dataset 02</span>

            <h2>Users</h2>
          </div>

          <span className="section-count">{users.length} users</span>
        </div>

        <DataTable
          rows={users}
          columns={userColumns}
          searchKey="name"
          filters={userFilters}
          getRowId={(user) => user.id}
          onRowClick={handleUserClick}
        />
      </section>
    </main>
  );
}

export default App;
