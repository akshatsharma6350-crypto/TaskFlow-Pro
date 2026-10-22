import { Activity, ArrowUpRight, CheckCircle2, Clock3, Flame, Target, TrendingUp } from "lucide-react";
import { useMemo } from "react";

const colors = ["#7c6cf2", "#5aa7f4", "#35b98a", "#f4a261", "#e879a9"];

export default function Analytics({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const rate = total ? Math.round(completed / total * 100) : 0;
  const categories = useMemo(() => {
    const names = ["Work", "Learning", "Personal", "Health", "Other"];
    return names.map((name, index) => ({ name, count: tasks.filter(t => t.category === name).length, color: colors[index] })).filter(item => item.count || ["Work", "Learning", "Personal"].includes(item.name));
  }, [tasks]);
  const priorities = ["High", "Medium", "Low"].map((name) => ({ name, count: tasks.filter(t => t.priority === name && !t.completed).length }));
  const maxPriority = Math.max(1, ...priorities.map(p => p.count));
  const recent = tasks.slice(0, 5);
  return (
    <div className="analytics-page">
      <section className="analytics-hero"><div><div className="analytics-kicker"><Activity size={14} /> YOUR PROGRESS, IN PERSPECTIVE</div><h2>Consistency beats<br /><span>intensity.</span></h2><p>Your productivity isn't about doing everything. It's about making steady progress on what matters.</p></div><div className="analytics-hero-score"><div className="analytics-score-ring" style={{ "--score": `${rate * 3.6}deg` }}><div><strong>{rate}%</strong><small>completion rate</small></div></div><span><TrendingUp size={14} /> Your current overview</span></div></section>
      <section className="analytics-stat-grid">
        <div className="analytics-stat"><span className="stat-icon stat-purple"><Target size={18} /></span><strong>{total}</strong><span>Total tasks</span></div>
        <div className="analytics-stat"><span className="stat-icon stat-green"><CheckCircle2 size={18} /></span><strong>{completed}</strong><span>Completed tasks</span></div>
        <div className="analytics-stat"><span className="stat-icon stat-blue"><Clock3 size={18} /></span><strong>{total - completed}</strong><span>Still in progress</span></div>
        <div className="analytics-stat"><span className="stat-icon stat-orange"><Flame size={18} /></span><strong>{rate}%</strong><span>Completion rate</span></div>
      </section>
      <div className="analytics-grid">
        <section className="panel analytics-panel"><div className="section-header"><div><h2>Tasks by category</h2><p>Where your attention is going</p></div></div>
          <div className="category-chart">{categories.map(item => <div className="category-chart-row" key={item.name}><div className="chart-row-label"><span className="chart-legend" style={{ background: item.color }} />{item.name}<strong>{item.count}</strong></div><div className="chart-bar-track"><span style={{ width: `${total ? item.count / total * 100 : 0}%`, background: item.color }} /></div></div>)}</div>
          <div className="chart-footer">Your work is made up of small, meaningful actions.</div>
        </section>
        <section className="panel analytics-panel"><div className="section-header"><div><h2>Priority breakdown</h2><p>Know what needs your attention</p></div></div>
          <div className="priority-chart">{priorities.map(item => <div className="priority-chart-row" key={item.name}><div><span className={`priority-dot priority-dot-${item.name.toLowerCase()}`} />{item.name}<strong>{item.count}</strong></div><div className="chart-bar-track"><span className={`priority-bar priority-bar-${item.name.toLowerCase()}`} style={{ width: `${item.count / maxPriority * 100}%` }} /></div></div>)}</div>
          <div className="priority-insight"><span>✦</span><p><strong>Work smarter, not harder.</strong><br />Start with one high-priority task to build momentum.</p></div>
        </section>
      </div>
      <section className="panel analytics-panel recent-activity"><div className="section-header"><div><h2>Recent task activity</h2><p>A snapshot of what's on your plate</p></div></div>
        {recent.length ? recent.map(task => <div className="activity-row" key={task.id}><span className={`activity-status ${task.completed ? "activity-done" : ""}`}>{task.completed ? <CheckCircle2 size={16} /> : <Clock3 size={16} />}</span><div><strong>{task.title}</strong><small>{task.category} · {task.priority} priority</small></div><span className={`activity-label ${task.completed ? "label-done" : ""}`}>{task.completed ? "Completed" : "In progress"}</span></div>) : <div className="empty-state"><strong>No activity yet</strong><p>Tasks you create will appear here.</p></div>}
      </section>
    </div>
  );
}
