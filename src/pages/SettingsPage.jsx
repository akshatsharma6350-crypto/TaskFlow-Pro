import { Check, Database, Moon, Palette, RotateCcw, ShieldCheck, Sun } from "lucide-react";

export default function SettingsPage({ theme, setTheme, onReset }) {
  return (
    <div className="settings-page">
      <section className="panel settings-panel"><div className="settings-section-heading"><div className="settings-icon"><Palette size={19} /></div><div><h2>Appearance</h2><p>Make your workspace feel like yours.</p></div></div>
        <div className="settings-row"><div><strong>Color theme</strong><small>Choose the look that feels right for you.</small></div><div className="theme-options"><button className={theme === "light" ? "theme-option active" : "theme-option"} onClick={() => setTheme("light")}><Sun size={16} />Light{theme === "light" && <Check size={14} />}</button><button className={theme === "dark" ? "theme-option active" : "theme-option"} onClick={() => setTheme("dark")}><Moon size={16} />Dark{theme === "dark" && <Check size={14} />}</button></div></div>
      </section>
      <section className="panel settings-panel"><div className="settings-section-heading"><div className="settings-icon settings-icon-green"><Database size={19} /></div><div><h2>Your data</h2><p>Your tasks stay in this browser on this device.</p></div></div>
        <div className="settings-row"><div><strong>Local storage</strong><small>TaskFlow saves your tasks automatically as you work.</small></div><span className="settings-status"><i /> Enabled</span></div>
        <div className="settings-row"><div><strong>Restore demo tasks</strong><small>Replace your current task list with the sample tasks.</small></div><button className="button button-ghost" onClick={() => { if (window.confirm("Restore demo tasks? This will replace your current list.")) onReset(); }}><RotateCcw size={15} /> Restore demo</button></div>
      </section>
      <section className="privacy-note"><span><ShieldCheck size={19} /></span><div><strong>Your workspace, your data.</strong><p>This demo stores information in your browser's local storage. It doesn't send your task data to a server. Clearing browser storage will remove saved tasks.</p></div></section>
      <div className="settings-version">TASKFLOW PRO <span>·</span> VERSION 1.0.0 <span>·</span> MADE FOR YOUR MOMENTUM</div>
    </div>
  );
}
