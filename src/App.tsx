import DataTable from "./components/DataTable/DataTable";

import type { Column } from "./components/DataTable/types";
import type { Project } from "./types/project";

import { projects } from "./data/project";

const projectColumns: Column<Project>[] = [
  {
    kind: "data",
    key: "name",
    header: "Project Name",
  },
  {
    kind: "data",
    key: "status",
    header: "Status",
  },
  {
    kind: "data",
    key: "priority",
    header: "Priority",
  },
  {
    kind: "data",
    key: "createdAt",
    header: "Created At",
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
        />
      </section>
    </main>
  );
}

export default App;