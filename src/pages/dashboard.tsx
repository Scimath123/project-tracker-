import { useTaskStore } from "../store/taskforce";
import KanbanBoard from "../components/kanban/kanbanboard";
import ListView from "../components/list/List";
import TimelineView from "../components/timeline/timeline";

const Dashboard = () => {
  const { view, setView } = useTaskStore();

  const getBtnClass = (currentView: "kanban" | "list" | "timeline") =>
    `px-4 py-2 text-sm font-medium rounded-lg ${
      view === currentView
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="p-6 bg-indigo-60 min-h-screen">
      <h1 className="text-xl font-bold font-serif mb-4">
        Project Tracker
      </h1>

      {/* buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("kanban")}
          className={getBtnClass("kanban")}
        >
          Kanban
        </button>

        <button
          onClick={() => setView("list")}
          className={getBtnClass("list")}
        >
          List
        </button>

        <button
          onClick={() => setView("timeline")}
          className={getBtnClass("timeline")}
        >
          Timeline
        </button>
      </div>

      {/* views */}
      {view === "kanban" && <KanbanBoard />}
      {view === "list" && <ListView />}
      {view === "timeline" && <TimelineView />}
    </div>
  );
};

export default Dashboard;