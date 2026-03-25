import { useTaskStore } from "../../store/taskforce";
import { useState, useEffect } from "react";

import { useCollaboration } from "../hooks/collaboration";
import AvatarStack from "../Avatarstack";
import CollaborationBar from "../collaboration";

const columns = [
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "completed", title: "Completed" },
  { key: "backlog", title: "Backlog" },
];

const KanbanBoard = () => {
  const { tasks, draggedTaskId, setDraggedTask, updateTaskStatus } =
    useTaskStore();

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

 
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 800); 
    return () => clearInterval(interval);
  }, []);

  const draggedTask = tasks.find((t) => t.id === draggedTaskId);

  const users = useCollaboration(tasks);

  return (
    <div
      className="flex flex-col h-full"
      onMouseLeave={() => setDraggedTask(null)}
      onMouseMove={(e) => {
        if (draggedTaskId) {
          setDragPosition({ x: e.clientX, y: e.clientY });
        }
      }}
    >
      <div className="px-4 pt-3">
        <CollaborationBar users={users} />
      </div>

      <div className="flex gap-4 p-4 overflow-x-auto flex-1">
        {columns.map((col) => {
         
          const columnTasks = tasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              className={`rounded-lg p-3 w-72 flex-shrink-0 flex flex-col transition ${
                draggedTaskId
                  ? "bg-blue-50 border-2 border-blue-300"
                  : "bg-gray-100"
              }`}
              onMouseUp={() => {
                if (draggedTaskId) {
                  updateTaskStatus(draggedTaskId, col.key as any);
                  setDraggedTask(null);
                }
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium text-sm">{col.title}</h2>
                <span className="text-xs text-gray-500">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex flex-col gap-2 overflow-y-auto">
                {columnTasks.map((task) => {
                  const due = new Date(task.dueDate);
                  const isOverdue = due.getTime() < Date.now();

                  
                  const formatted = new Intl.DateTimeFormat("en-US", {
                    dateStyle: "full",
                    timeStyle: "long",
                  }).format(due);

                
                  const taskUsers = users.filter(
                    (u) => u.taskId === task.id
                  );

              
                

                  return (
                    <div
                      key={task.id}
                      onMouseDown={() => setDraggedTask(task.id)}
                      onMouseUp={(e) => e.stopPropagation()}
                      className={`bg-white p-3 rounded-md shadow-sm text-sm space-y-2 transition cursor-grab active:cursor-grabbing ${
                        draggedTaskId === task.id
                          ? "opacity-50 scale-95"
                          : "hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{task.title}</div>

                        <AvatarStack users={taskUsers} />
                      </div>

                    
                      <div className="text-[10px] text-gray-400 truncate">
                        {formatted}
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                          {task.assignee}
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-white ${
                            task.priority === "critical"
                              ? "bg-red-500"
                              : task.priority === "high"
                              ? "bg-orange-500"
                              : task.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          isOverdue
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {isOverdue ? "Overdue" : "On Track"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {draggedTask && (
          <div
            style={{
              position: "fixed",
              top: dragPosition.y,
              left: dragPosition.x,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
            className="bg-white p-3 rounded-md shadow-lg text-sm w-60"
          >
            <div className="font-medium">{draggedTask.title}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;