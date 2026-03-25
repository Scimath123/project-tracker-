export type Status = "todo" | "inprogress" | "completed" | "backlog";

export type Priority = "critical" | "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  assignee: string;
  startDate?: string;
  dueDate: string;
};