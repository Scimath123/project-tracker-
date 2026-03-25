import type{ Task, Status, Priority } from "../types/task";

const statuses: Status[] = ["todo", "inprogress", "completed", "backlog"];
const priorities: Priority[] = ["critical", "high", "medium", "low"];
const assignees = ["AK", "RS", "VP", "MK", "JD"];

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const randomTitle = () => {
  const words = ["Fix", "Build", "Design", "Implement", "Update", "Refactor"];
  const things = ["UI", "API", "Dashboard", "Auth", "Feature", "Logic"];
  return `${words[Math.floor(Math.random() * words.length)]} ${
    things[Math.floor(Math.random() * things.length)]
  }`;
};

export const generateTasks = (count: number = 500): Task[] => {
const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
const priority =
priorities[Math.floor(Math.random() * priorities.length)];

let start: Date;
    let durationDays: number;
//logic for the deciding the start to end of task using priority
if (priority === "critical") {
    start = randomDate(new Date(2026, 1, 20), new Date(2026, 2, 10));
        durationDays = Math.floor(Math.random() * 10) + 10;
} else if (priority === "high") {
     start = randomDate(new Date(2026, 2, 1), new Date(2026, 2, 15));
 durationDays = Math.floor(Math.random() * 7) + 7;
} else if (priority === "medium") {
    start = randomDate(new Date(2026, 2, 5), new Date(2026, 2, 20));
        durationDays = Math.floor(Math.random() * 5) + 3;
} else {
start = randomDate(new Date(2026, 2, 10), new Date(2026, 2, 25));

    durationDays = Math.floor(Math.random() * 3) + 1;
    }

    const due = new Date(start);
    due.setDate(start.getDate() + durationDays);

    // if task overdues
    const current = new Date();
    if (current.getTime() > due.getTime() || Math.random() < 0.15) {


      due.setDate(due.getDate() - 7);
    }

    const hasStartDate = Math.random() > 0.2;

    tasks.push({
      id: i.toString(),
      title: randomTitle(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      startDate: hasStartDate ? start.toISOString() : undefined,
      dueDate: due.toISOString(),
    });
  }

  return tasks;
};