import { create } from "zustand";
import type { Task, Status } from "../types/task";
import { generateTasks } from "../utils/datagenerate";

// the differnet views
type ViewType = "kanban" | "list" | "timeline";

//  structure
type Store = {
  tasks: Task[];
  view: ViewType;


  draggedTaskId: string | null;

  setView: (view: ViewType) => void;

 
  setDraggedTask: (id: string | null) => void;

  updateTaskStatus: (taskId: string, newStatus: Status) => void;
};

// craete zustand store
export const useTaskStore = create<Store>((set) => ({
  
  // Initial state
  tasks: generateTasks(500),
  view: "kanban",

 
  draggedTaskId: null,

  // changing in  current view
  setView: (view) => {
    set({ view });
  },

 
  setDraggedTask: (id) => {
    set({ draggedTaskId: id });
  },

  // to update
  updateTaskStatus: (taskId, newStatus) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus }; //to update only status 
        }
        return task; 
      });

      return { tasks: updatedTasks };
    });
  },
}));