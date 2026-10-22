import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Plus } from "lucide-react";
import TaskCard from "../components/tasks/TaskCard";
import { dateKey, formatDate } from "../utils/date";

export default function CalendarPage({ tasks, onToggle, onEdit, onCreate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthLabel = currentDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = dateKey(new Date());
  const [selectedDay, setSelectedDay] = useState(todayKey);
  const days = useMemo(() => {
    const output = Array.from({ length: firstDay }, () => null);
    for (let day = 1; day <= daysInMonth; day++) output.push(dateKey(new Date(year, month, day)));
    return output;
  }, [firstDay, daysInMonth, year, month]);
  const selectedTasks = tasks.filter((task) => task.dueDate === selectedDay);
  const changeMonth = (amount) => {
    const next = new Date(year, month + amount, 1);
    setCurrentDate(next);
    setSelectedDay(dateKey(next));
  };
  const dayNumber = (key) => key ? Number(key.split("-")[2]) : "";
  return (
    <div className="calendar-page">
      <section className="calendar-layout">
        <div className="panel calendar-panel">
          <div className="calendar-heading"><div><div className="calendar-kicker"><CalendarDays size={14} /> PLAN WITH INTENTION</div><h2>{monthLabel}</h2></div><div className="calendar-controls"><button className="icon-button" onClick={() => changeMonth(-1)} aria-label="Previous month"><ArrowLeft size={17} /></button><button className="button button-ghost button-small" onClick={() => { setCurrentDate(new Date()); setSelectedDay(todayKey); }}>Today</button><button className="icon-button" onClick={() => changeMonth(1)} aria-label="Next month"><ArrowRight size={17} /></button></div></div>
          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day} className="calendar-weekday">{day}</div>)}
            {days.map((key, index) => {
              const count = key ? tasks.filter(task => task.dueDate === key).length : 0;
              return <button key={key || `empty-${index}`} disabled={!key} className={`calendar-day ${key === todayKey ? "is-today" : ""} ${key === selectedDay ? "is-selected" : ""} ${count ? "has-tasks" : ""}`} onClick={() => key && setSelectedDay(key)}>
                <span>{dayNumber(key)}</span>{count > 0 && <i className="calendar-task-dots">{Array.from({ length: Math.min(count, 3) }, (_, i) => <b key={i} />)}</i>}
              </button>;
            })}
          </div>
          <div className="calendar-legend"><span><i className="legend-today" />Today</span><span><i className="legend-tasks" />Has tasks</span><span><i className="legend-selected" />Selected day</span></div>
        </div>
        <div className="panel calendar-agenda">
          <div className="agenda-heading"><div><span className="agenda-kicker">YOUR AGENDA</span><h2>{selectedDay === todayKey ? "Today's plan" : formatDate(selectedDay, { weekday: "long", month: "short", day: "numeric" })}</h2></div><button className="icon-button add-icon" onClick={onCreate} aria-label="Add task"><Plus size={18} /></button></div>
          <p className="agenda-subtitle">{selectedTasks.length ? `${selectedTasks.length} task${selectedTasks.length === 1 ? "" : "s"} scheduled` : "A little space to plan something great."}</p>
          <div className="agenda-list">{selectedTasks.length ? selectedTasks.map(task => <TaskCard key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={() => {}} compact />) : <div className="agenda-empty"><div><CalendarDays size={24} /></div><strong>Your day is open</strong><p>Use the breathing room, or add a task when you're ready.</p><button className="button button-primary button-small" onClick={onCreate}><Plus size={15} /> Schedule a task</button></div>}</div>
          <div className="agenda-tip"><span>✦</span><p><strong>A gentle reminder</strong><br />Leave a little room for the unexpected.</p></div>
        </div>
      </section>
    </div>
  );
}
