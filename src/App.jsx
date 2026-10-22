import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, CalendarDays, CheckCheck, ChevronDown, CircleHelp, Command,
  LayoutDashboard, ListTodo, LogOut, Menu, Plus, Search, Settings, Sparkles,
  Target, X
} from "lucide-react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CalendarPage from "./pages/CalendarPage";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/SettingsPage";
import TaskModal from "./components/tasks/TaskModal";
import { initialTasks } from "./data/initialTasks";
import { readStorage, writeStorage } from "./utils/storage";
import { isToday, parseISO } from "./utils/date";

const NAV_ITEMS = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "My Tasks", path: "/tasks", icon: ListTodo },
  { label: "Calendar", path: "/calendar", icon: CalendarDays },
  { label: "Insights", path: "/analytics", icon: Activity },
];

export default function App() {
  const [tasks, setTasks] = useState(() => readStorage("taskflow.tasks", initialTasks));
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [theme, setTheme] = useState(() => readStorage("taskflow.theme", "light"));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => writeStorage("taskflow.tasks", tasks), [tasks]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorage("taskflow.theme", theme);
  }, [theme]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const todayCount = tasks.filter((task) => !task.completed && isToday(task.dueDate)).length;
  const overdueCount = tasks.filter((task) => !task.completed && task.dueDate && parseISO(task.dueDate) < new Date() && !isToday(task.dueDate)).length;

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesQuery = !query || `${task.title} ${task.description} ${task.category}`.toLowerCase().includes(query);
      let matchesFilter = true;
      if (activeFilter === "today") matchesFilter = isToday(task.dueDate);
      if (activeFilter === "upcoming") matchesFilter = task.dueDate && !isToday(task.dueDate) && parseISO(task.dueDate) >= new Date() && !task.completed;
      if (activeFilter === "completed") matchesFilter = task.completed;
      if (activeFilter === "high") matchesFilter = task.priority === "High" && !task.completed;
      if (activeFilter === "all") matchesFilter = true;
      return matchesQuery && matchesFilter;
    });
  }, [tasks, activeFilter, searchQuery]);

  function addTask(taskData) {
    const task = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: taskData.title.trim(),
      description: taskData.description || "",
      category: taskData.category || "Personal",
      priority: taskData.priority || "Medium",
      dueDate: taskData.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((current) => [task, ...current]);
    setModalOpen(false);
    setEditingTask(null);
    setToast("Task created successfully");
  }

  function updateTask(taskData) {
    setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...task, ...taskData, title: taskData.title.trim() } : task));
    setModalOpen(false);
    setEditingTask(null);
    setToast("Changes saved");
  }

  function toggleTask(id) {
    const task = tasks.find((item) => item.id === id);
    setTasks((current) => current.map((item) => item.id === id ? { ...item, completed: !item.completed } : item));
    setToast(task?.completed ? "Task moved back to active" : "Nice work — task completed!");
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
    setToast("Task deleted");
  }

  function openEdit(task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function openCreate() {
    setEditingTask(null);
    setModalOpen(true);
  }

  const pageTitles = {
    "/": ["Good morning, Akshat 👋", "Here's your productivity snapshot for today."],
    "/tasks": ["My Tasks", "Keep your priorities clear and your momentum going."],
    "/calendar": ["Task Calendar", "See what's coming up and plan your week."],
    "/analytics": ["Your Insights", "Small steps add up. Here's how you're doing."],
    "/settings": ["Settings", "Make TaskFlow work the way you do."],
  };
  const [title, subtitle] = pageTitles[location.pathname] || pageTitles["/"];

  return (
    <div className="app-shell">
      <Sidebar
        items={NAV_ITEMS}
        settingsItem={{ label: "Settings", path: "/settings", icon: Settings }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pendingCount={pendingCount}
      />
      {sidebarOpen && <button className="mobile-scrim" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
      <main className="main-panel">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenu={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onCreate={openCreate}
        />
        <div className="page-content">
          <Routes>
            <Route path="/" element={
              <Dashboard
                tasks={tasks}
                filteredTasks={filteredTasks}
                stats={{ total: tasks.length, completed: completedCount, pending: pendingCount, today: todayCount, overdue: overdueCount }}
                onCreate={openCreate}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={deleteTask}
                onNavigate={navigate}
                onFilter={setActiveFilter}
              />
            } />
            <Route path="/tasks" element={
              <Tasks
                tasks={filteredTasks}
                allTasks={tasks}
                activeFilter={activeFilter}
                onFilter={setActiveFilter}
                onCreate={openCreate}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={deleteTask}
              />
            } />
            <Route path="/calendar" element={<CalendarPage tasks={tasks} onToggle={toggleTask} onEdit={openEdit} onCreate={openCreate} />} />
            <Route path="/analytics" element={<Analytics tasks={tasks} />} />
            <Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme} onReset={() => { setTasks(initialTasks); setToast("Demo tasks restored"); }} />} />
          </Routes>
        </div>
        <footer className="app-footer"><span>© 2026 TaskFlow Pro</span><span><span className="status-dot" /> All changes saved locally</span></footer>
      </main>
      {modalOpen && <TaskModal task={editingTask} onClose={() => { setModalOpen(false); setEditingTask(null); }} onSubmit={editingTask ? updateTask : addTask} />}
      {toast && <div className="toast"><CheckCheck size={17} />{toast}</div>}
    </div>
  );
}
