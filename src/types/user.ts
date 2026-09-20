export type UserRole =
  | "admin"
  | "developer"
  | "viewer";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
};