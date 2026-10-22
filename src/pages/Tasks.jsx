import { CheckCircle2, CircleDashed, Clock3, Filter, ListFilter, Plus, Search, SlidersHorizontal } from "lucide-react";
import TaskCard from "../components/tasks/TaskCard";
import SectionHeader from "../components/ui/SectionHeader";

const filters = [
  { id: "all", label: "All tasks", icon: ListFilter },
  { id: "today", label: "Today", icon: Clock3 },
  { id: "upcoming", label: "Upcoming", icon: CircleDashed },
  { id: "high", label: "High priority", icon: Filter },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
];

export default function Tasks({ tasks, allTasks, activeFilter, onFilter, onCreate, onToggle, onEdit, onDelete }) {
  const completed = tasks.filter((task) => task.completed).length;
  return (
    <div className="tasks-page">
      <section className="tasks-summary-strip">
        <div><span className="summary-strip-icon"><ListFilter size={19} /></span><span><strong>{allTasks.length} total tasks</strong><small>Your personal command center</small></span></div>
        <div className="summary-strip-stats"><span><i className="summary-dot pending-dot" />{allTasks.filter(t => !t.completed).length} active</span><span><i className="summary-dot done-dot" />{allTasks.filter(t => t.completed).length} completed</span></div>
      </section>
      <section className="panel task-manager-panel">
        <SectionHeader title="Task manager" subtitle="Sort your day, protect your focus." action={<button className="button button-primary button-small" onClick={onCreate}><Plus size={16} /> New task</button>} />
        <div className="task-filter-tabs">
          {filters.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => onFilter(id)} className={activeFilter === id ? "selected" : ""}><Icon size={15} />{label}<span>{id === "all" ? allTasks.length : id === "completed" ? allTasks.filter(t => t.completed).length : id === "high" ? allTasks.filter(t => t.priority === "High" && !t.completed).length : id === "today" ? allTasks.filter(t => t.dueDate === new Date().toLocaleDateString("en-CA") && !t.completed).length : allTasks.filter(t => t.dueDate && new Date(`${t.dueDate}T00:00:00`) > new Date() && !t.completed).length}</span></button>)}
        </div>
        <div className="task-list task-manager-list">
          {tasks.length ? tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />) : <div className="empty-state"><div className="empty-icon"><Search size={23} /></div><strong>No tasks found</strong><p>Try a different filter or create a new task.</p><button className="button button-primary button-small" onClick={onCreate}><Plus size={15} /> Create task</button></div>}
        </div>
        {tasks.length > 0 && <div className="list-footer">Showing <strong>{tasks.length}</strong> task{tasks.length === 1 ? "" : "s"} <span>·</span> {completed} completed in this view</div>}
      </section>
    </div>
  );
}
