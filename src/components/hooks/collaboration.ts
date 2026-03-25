import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  color: string;
  taskId: string | null;
};

const NAMES = ["Aman", "Riya", "John", "Sara"];
const COLORS = ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-purple-400"];

export const useCollaboration = (tasks: any[]) => {
  const [users, setUsers] = useState<User[]>([]);

  //  users
  useEffect(() => {
    const count = Math.floor(Math.random() * 3) + 2; // 2–4 users

    const initialUsers: User[] = Array.from({ length: count }).map((_, i) => ({
      id: `user-${i}`,
      name: NAMES[i],
      color: COLORS[i],
      taskId: tasks[Math.floor(Math.random() * tasks.length)]?.id || null,
    }));

    setUsers(initialUsers);
  }, [tasks]);

  //  movement
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((user) => {
          const randomTask =
            tasks[Math.floor(Math.random() * tasks.length)];

          return {
            ...user,
            taskId: randomTask?.id || null,
          };
        })
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [tasks]);

  return users;
};