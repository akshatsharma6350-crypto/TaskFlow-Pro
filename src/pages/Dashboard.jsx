import { ArrowRight, ArrowUpRight, CheckCircle2, CircleDashed, Clock3, Flame, Plus, Target, TrendingUp, Zap } from "lucide-react";
import TaskCard from "../components/tasks/TaskCard";
import SectionHeader from "../components/ui/SectionHeader";
import { isToday } from "../utils/date";

export default function Dashboard({ tasks, filteredTasks, stats, onCreate, onToggle, onEdit, onDelete, onNavigate, onFilter }) {
  const todayTasks = tasks.filter((task) => isToday(task.dueDate));
  const openToday = todayTasks.filter((task) => !task.completed);
  const completedToday = todayTasks.filter((task) => task.completed);
  const completion = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
  const firstName = "Akshat";

  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div className="welcome-copy"><div className="welcome-pill"><span /> YOUR DAILY RESET</div><h2>Make today<br />count, {firstName}.</h2><p>Progress doesn't need to be perfect.<br />It just needs to be yours.</p><button className="button button-light" onClick={onCreate}><Plus size={17} /> Plan a task</button></div>
        <div className="welcome-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-glow" /><div className="art-card art-card-back"><span className="art-mini-check">✓</span><span className="art-lines"><i /><i /></span></div><div className="art-card art-card-front"><div className="art-check-large"><CheckCircle2 size={30} /></div><div><strong>One step at a time</strong><span>You're building momentum</span></div><div className="art-spark">✦</div></div><div className="art-floating art-floating-one"><Flame size={17} /><strong>Stay consistent</strong></div><div className="art-floating art-floating-two"><span>↗</span><strong>{completion}%</strong><small>completed</small></div></div>
        <div className="welcome-bottom"><span><Zap size={14} /> A little progress every day adds up.</span><span>LET'S GET IT DONE <ArrowUpRight size={14} /></span></div>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><div className="stat-top"><span className="stat-icon stat-purple"><CircleDashed size={19} /></span><span className="stat-trend">All time</span></div><div className="stat-number">{stats.total}<span className="stat-unit"> tasks</span></div><div className="stat-label">Total tasks created</div><div className="stat-bottom"><span className="tiny-bar"><i style={{ width: `${Math.max(completion, 4)}%` }} /></span><span>{completion}% done</span></div></div>
        <div className="stat-card"><div className="stat-top"><span className="stat-icon stat-blue"><Clock3 size={19} /></span><span className="stat-trend trend-neutral">In progress</span></div><div className="stat-number">{stats.pending}<span className="stat-unit"> tasks</span></div><div className="stat-label">Still on your list</div><div className="stat-note"><span className="note-dot blue" /> Keep your focus on the next step</div></div>
        <div className="stat-card"><div className="stat-top"><span className="stat-icon stat-green"><CheckCircle2 size={19} /></span><span className="stat-trend trend-positive"><TrendingUp size={13} /> Moving forward</span></div><div className="stat-number">{stats.completed}<span className="stat-unit"> tasks</span></div><div className="stat-label">Tasks completed</div><div className="stat-note"><span className="note-dot green" /> Every finish is a win</div></div>
        <div className="stat-card"><div className="stat-top"><span className="stat-icon stat-orange"><Target size={19} /></span><span className="stat-trend trend-warning">{stats.overdue ? "Needs attention" : "Looking good"}</span></div><div className="stat-number">{stats.today}<span className="stat-unit"> tasks</span></div><div className="stat-label">Due today</div><div className="stat-note"><span className={`note-dot ${stats.overdue ? "orange" : "green"}`} /> {stats.overdue ? `${stats.overdue} overdue — take a look` : "You're right on track"}</div></div>
      </section>

      <div className="dashboard-columns">
        <section className="panel today-panel">
          <SectionHeader title="Today's focus" subtitle={`${openToday.length} task${openToday.length === 1 ? "" : "s"} left to complete`} action={<button className="text-button" onClick={() => { onFilter("today"); onNavigate("/tasks"); }}>View all <ArrowRight size={15} /></button>} />
          <div className="today-progress"><div className="progress-copy"><span>Daily progress</span><strong>{todayTasks.length ? Math.round((completedToday.length / todayTasks.length) * 100) : 0}%</strong></div><div className="progress-track"><span style={{ width: `${todayTasks.length ? (completedToday.length / todayTasks.length) * 100 : 0}%` }} /></div></div>
          <div className="task-list">
            {todayTasks.length ? todayTasks.slice(0, 4).map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} compact />) : <div className="empty-state"><div className="empty-icon"><CheckCircle2 size={24} /></div><strong>A clear day starts here</strong><p>Add a task to give your day some direction.</p><button className="button button-primary button-small" onClick={onCreate}><Plus size={15} /> Add your first task</button></div>}
          </div>
          {todayTasks.length > 0 && <button className="add-task-inline" onClick={onCreate}><Plus size={16} /> Add another task</button>}
        </section>

        <section className="panel quick-panel">
          <SectionHeader title="Your momentum" subtitle="A quick look at your habits" />
          <div className="momentum-score"><div className="score-ring" style={{ "--score": `${completion * 3.6}deg` }}><div><strong>{completion}%</strong><span>complete</span></div></div><div className="score-copy"><strong>{completion >= 70 ? "You're on a roll!" : completion >= 35 ? "You're building rhythm" : "Your journey starts now"}</strong><p>{completion >= 70 ? "Look at you showing up for yourself. Keep that energy." : "Every task you finish is proof that you're moving forward."}</p></div></div>
          <div className="momentum-divider" />
          <div className="momentum-row"><span className="momentum-icon purple-bg"><CheckCircle2 size={16} /></span><span><strong>Completed</strong><small>Tasks you've finished</small></span><b>{stats.completed}</b></div>
          <div className="momentum-row"><span className="momentum-icon blue-bg"><Clock3 size={16} /></span><span><strong>In progress</strong><small>Waiting for your attention</small></span><b>{stats.pending}</b></div>
          <button className="insights-link" onClick={() => onNavigate("/analytics")}>Explore detailed insights <ArrowRight size={15} /></button>
        </section>
      </div>

      <section className="panel all-tasks-panel">
        <SectionHeader title="Recently added" subtitle="Your latest tasks, all in one place" action={<button className="text-button" onClick={() => onNavigate("/tasks")}>All tasks <ArrowRight size={15} /></button>} />
        <div className="task-list">
          {tasks.slice(0, 3).map((task) => <TaskCard key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />)}
          {!tasks.length && <div className="empty-state"><strong>Nothing here yet</strong><p>Create a task to get started.</p><button className="button button-primary button-small" onClick={onCreate}><Plus size={15} /> Create task</button></div>}
        </div>
      </section>
    </div>
  );
}
