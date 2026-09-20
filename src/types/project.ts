export type ProjectStatus = "planned" | "active" | "completed";

export type ProjectPriority = "low" | "medium" | "high";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  createdAt: string;
};