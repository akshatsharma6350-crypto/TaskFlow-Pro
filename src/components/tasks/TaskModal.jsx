import { useEffect, useState } from "react";
import { CalendarDays, Check, Flag, Tag, X } from "lucide-react";

export default function TaskModal({ task, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "Work",
    priority: task?.priority || "Medium",
    dueDate: task?.dueDate || new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) { setError("Give your task a title first."); return; }
    onSubmit(form);
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div><div className="modal-kicker"><span className="modal-spark">✦</span> MAKE IT HAPPEN</div><h2 id="modal-title">{task ? "Edit task" : "Create a new task"}</h2><p>Break your next goal into a clear action.</p></div>
          <button className="icon-button" onClick={onClose} aria-label="Close modal"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Task title <span className="required">*</span>
            <input autoFocus maxLength={100} value={form.title} onChange={(e) => { setForm({ ...form, title: e.target.value }); setError(""); }} placeholder="e.g. Finish the landing page" />
          </label>
          {error && <div className="form-error">{error}</div>}
          <label className="form-label">Description <span className="optional">Optional</span>
            <textarea rows="3" maxLength={400} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Add a little context or the next step..." />
          </label>
          <div className="form-grid">
            <label className="form-label"><span className="label-with-icon"><Tag size={14} /> Category</span>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Work</option><option>Learning</option><option>Personal</option><option>Health</option><option>Other</option>
              </select>
            </label>
            <label className="form-label"><span className="label-with-icon"><Flag size={14} /> Priority</span>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
          </div>
          <label className="form-label"><span className="label-with-icon"><CalendarDays size={14} /> Due date</span>
            <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
          </label>
          <div className="modal-footer"><span><span className="secure-dot" /> Saved on this device</span><div><button type="button" className="button button-ghost" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit"><Check size={16} /> {task ? "Save changes" : "Create task"}</button></div></div>
        </form>
      </section>
    </div>
  );
}
