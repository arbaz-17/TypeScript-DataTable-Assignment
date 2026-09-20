import DataTable from "./components/DataTable/DataTable";

import type { Column } from "./components/DataTable/types";
import type { Project } from "./types/project";
import type { User } from "./types/user";

import { projects } from "./data/projects";
import { users } from "./data/users";

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* ----------------------------- */
/* Project callbacks             */
/* ----------------------------- */

function handleProjectClick(project: Project) {
  console.log("Selected project:", project);
}

function handleEditProject(project: Project) {
  console.log("Edit project:", project);
}

function handleDeleteProject(project: Project) {
  console.log("Delete project:", project);
}

/* ----------------------------- */
/* User callbacks                */
/* ----------------------------- */

function handleUserClick(user: User) {
  console.log("Selected user:", user);
}

function handleEditUser(user: User) {
  console.log("Edit user:", user);
}

function handleDeleteUser(user: User) {
  console.log("Delete user:", user);
}

/* ----------------------------- */
/* Project columns               */
/* ----------------------------- */

const projectColumns: Column<Project>[] = [
  {
    kind: "data",
    key: "name",
    header: "Project Name",
    sortable: true,
    searchable: true,
  },
  {
    kind: "data",
    key: "status",
    header: "Status",
    searchable: true,
    render: (status) => <span>{formatLabel(status)}</span>,
  },
  {
    kind: "data",
    key: "priority",
    header: "Priority",
    searchable: true,
    render: (priority) => <span>{formatLabel(priority)}</span>,
  },
  {
    kind: "data",
    key: "createdAt",
    header: "Created At",
    sortable: true,
    searchable: true,
    render: (createdAt) => <time dateTime={createdAt}>{createdAt}</time>,
  },
  {
    kind: "display",
    id: "actions",
    header: "Actions",
    render: (project) => (
      <div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleEditProject(project);
          }}
        >
          Edit
        </button>

        <button
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

/* ----------------------------- */
/* User columns                  */
/* ----------------------------- */

const userColumns: Column<User>[] = [
  {
    kind: "data",
    key: "name",
    header: "Name",
    sortable: true,
    searchable: true,
  },
  {
    kind: "data",
    key: "email",
    header: "Email",
    sortable: true,
    searchable: true,
  },
  {
    kind: "data",
    key: "role",
    header: "Role",
    searchable: true,
    render: (role) => <span>{formatLabel(role)}</span>,
  },
  {
    kind: "data",
    key: "active",
    header: "Status",
    searchable: true,
    render: (active) => <span>{active ? "Active" : "Inactive"}</span>,
  },
  {
    kind: "display",
    id: "actions",
    header: "Actions",
    render: (user) => (
      <div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleEditUser(user);
          }}
        >
          Edit
        </button>

        <button
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

function App() {
  return (
    <main>
      <h1>Generic DataTable</h1>

      <section>
        <h2>Projects</h2>

        <DataTable
          rows={projects}
          columns={projectColumns}
          getRowId={(project) => project.id}
          onRowClick={handleProjectClick}
        />
      </section>

      <section>
        <h2>Users</h2>

        <DataTable
          rows={users}
          columns={userColumns}
          getRowId={(user) => user.id}
          onRowClick={handleUserClick}
        />
      </section>
    </main>
  );
}

export default App;
