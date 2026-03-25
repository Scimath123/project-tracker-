import { useTaskStore } from "../../store/taskforce";
import { useState, useRef, useEffect } from "react";

import { useCollaboration } from "../hooks/collaboration";
import AvatarStack from "../Avatarstack";
import CollaborationBar from "../collaboration";

const ROW_HEIGHT = 80;
const BUFFER = 5;

const TimelineView = () => {
  const {
    tasks,
    draggedTaskId,
    setDraggedTask,
    updateTaskStatus,
  } = useTaskStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 2000); // 
    return () => clearInterval(id);
  }, []);

  const draggedTask = tasks.find((t) => t.id === draggedTaskId);

  const users = useCollaboration(tasks);

  
  const sortedTasks = [...tasks].sort(
    (a, b) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const totalHeight = sortedTasks.length * ROW_HEIGHT;

  const containerHeight = containerRef.current?.clientHeight || 600;

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ROW_HEIGHT) - BUFFER
  );

  const endIndex = Math.min(
    sortedTasks.length,
    Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + BUFFER
  );

  const visibleTasks = sortedTasks.slice(startIndex, endIndex);

  const offsetY = startIndex * ROW_HEIGHT;

  return (
    <div
      ref={containerRef}
      className="h-[80vh] overflow-y-auto p-4"
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      onMouseLeave={() => setDraggedTask(null)}
      onMouseMove={(e) => {
        if (draggedTaskId) {
          setDragPosition({ x: e.clientX, y: e.clientY });
        }
      }}
    >
      <CollaborationBar users={users} />

      {/* Header */}
      <div className="grid grid-cols-4 text-xs font-semibold text-gray-500 mb-2 px-2 sticky top-0 bg-white z-10">
        <div>Timeline</div>
        <div>Title</div>
        <div>Assignee</div>
        <div>Status</div>
      </div>

      {/* Wrapper */}
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleTasks.map((task, index) => {
            const due = new Date(task.dueDate);
            const isOverdue = due.getTime() < Date.now();

         
            let fakeLoad = 0;
            for (let i = 0; i < 2000; i++) {
              fakeLoad += i % 3;
            }

            const taskUsers = users.filter((u) => u.taskId === task.id);

            return (
              <div
                key={task.id}
                onMouseDown={() => setDraggedTask(task.id)}
                onMouseUpCapture={() => {
                  if (draggedTaskId) {
                    updateTaskStatus(draggedTaskId, task.status);
                    setDraggedTask(null);
                  }
                }}
                className={`grid grid-cols-4 items-center bg-white p-4 rounded-md shadow-sm text-sm transition cursor-grab active:cursor-grabbing mb-2 ${
                  draggedTaskId === task.id
                    ? "opacity-50 scale-95"
                    : "hover:shadow-md"
                }`}
                style={{
                  height: ROW_HEIGHT,
                 
                  opacity: 1 - (index % 10) * 0.01,
                }}
              >
                {/* Timeline */}
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">
                    {due.toLocaleDateString()}
                  </span>
                  <span
                    className={`text-xs ${
                      isOverdue ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    {isOverdue ? "Overdue" : "On track"}
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-center gap-2">
                  <span className="font-medium">{task.title}</span>
                  <AvatarStack users={taskUsers} />
                </div>

                {/* Assignee */}
                <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                  {task.assignee}
                </div>

                {/* Status */}
                <span className="text-xs capitalize">{task.status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating drag */}
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

          <div className="flex justify-between items-center text-xs mt-2">
            <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
              {draggedTask.assignee}
            </div>

            <span
              className={`px-2 py-0.5 rounded text-white ${
                draggedTask.priority === "critical"
                  ? "bg-red-500"
                  : draggedTask.priority === "high"
                  ? "bg-orange-500"
                  : draggedTask.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {draggedTask.priority}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineView;