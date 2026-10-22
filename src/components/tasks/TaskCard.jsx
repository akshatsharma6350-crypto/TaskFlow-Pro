import { CalendarDays, Check, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { dueLabel } from "../../utils/date";
import { useState } from "react";

export default function TaskCard({ task, onToggle, onEdit, onDelete, compact = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <article className={`task-card ${task.completed ? "task-completed" : ""} ${compact ? "task-card-compact" : ""}`}>
      <button className={`task-check ${task.completed ? "checked" : ""}`} onClick={() => onToggle(task.id)} aria-label={task.completed ? "Mark incomplete" : "Complete task"}>
        {task.completed && <Check size={14} strokeWidth={3} />}
      </button>
      <div className="task-main">
        <div className="task-title-row"><h3>{task.title}</h3><span className={`priority priority-${task.priority.toLowerCase()}`}><i />{task.priority}</span></div>
        {task.description && !compact && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className={`category category-${task.category.toLowerCase()}`}><span />{task.category}</span>
          <span className={`due-date ${dueLabel(task.dueDate) === "Today" && !task.completed ? "due-today" : ""}`}><CalendarDays size={13} />{dueLabel(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-menu-wrap">
        <button className="icon-button task-more" onClick={() => setMenuOpen((value) => !value)} aria-label="Task options"><MoreHorizontal size={19} /></button>
        {menuOpen && <><button className="menu-dismiss" aria-label="Close task menu" onClick={() => setMenuOpen(false)} /><div className="task-popover">
          <button onClick={() => { setMenuOpen(false); onEdit(task); }}><Pencil size={14} /> Edit task</button>
          <button className="danger-action" onClick={() => { setMenuOpen(false); onDelete(task.id); }}><Trash2 size={14} /> Delete task</button>
        </div></>}
      </div>
    </article>
  );
}
