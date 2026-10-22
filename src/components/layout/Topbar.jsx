import { Bell, ChevronDown, Menu, Plus, Search, SlidersHorizontal, Sparkles } from "lucide-react";

export default function Topbar({ title, subtitle, onMenu, searchQuery, onSearch, onCreate }) {
  return (
    <header className="topbar">
      <div className="topbar-mobile-brand">
        <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open menu"><Menu size={21} /></button>
        <div className="brand-mark small"><span>✓</span></div>
        <strong>taskflow<span>pro</span></strong>
      </div>
      <div className="page-heading">
        <div className="eyebrow"><Sparkles size={13} /> YOUR PRODUCTIVITY SPACE</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={17} />
          <input value={searchQuery} onChange={(e) => onSearch(e.target.value)} placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification-button" aria-label="Notifications" onClick={() => window.alert("You're all caught up!")}>
          <Bell size={19} /><i />
        </button>
        <button className="button button-primary top-create" onClick={onCreate}><Plus size={18} /> New task</button>
      </div>
    </header>
  );
}
