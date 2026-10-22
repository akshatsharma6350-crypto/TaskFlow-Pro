import { NavLink } from "react-router-dom";
import { ArrowUpRight, Check, CircleHelp, Command, Crown, X } from "lucide-react";

export default function Sidebar({ items, settingsItem, open, onClose, pendingCount }) {
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand-row">
        <div className="brand-mark"><Check size={22} strokeWidth={3} /></div>
        <div className="brand-name">taskflow<span>pro</span></div>
        <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
      </div>

      <div className="workspace-switcher">
        <div className="workspace-avatar">A</div>
        <div className="workspace-copy"><strong>Akshat's workspace</strong><span>Personal space</span></div>
        <span className="chevron">⌄</span>
      </div>

      <div className="nav-section-label">WORKSPACE</div>
      <nav className="nav-list">
        {items.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} end={path === "/"} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
            {label === "My Tasks" && <span className="nav-count">{pendingCount}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-section">
        <div className="nav-section-label">YOUR SPACE</div>
        <div className="sidebar-mini-link"><span className="mini-dot violet" />Personal goals</div>
        <div className="sidebar-mini-link"><span className="mini-dot orange" />Learning</div>
        <div className="sidebar-mini-link"><span className="mini-dot green" />Work projects</div>
      </div>

      <div className="sidebar-spacer" />
      <div className="upgrade-card">
        <div className="upgrade-icon"><Crown size={18} /></div>
        <strong>Make room for focus</strong>
        <p>One clear priority can change your whole day.</p>
        <div className="upgrade-progress"><span /></div>
        <div className="upgrade-foot"><span>Daily momentum</span><b>Keep going</b></div>
      </div>
      <nav className="nav-list bottom-nav">
        <NavLink to={settingsItem.path} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <settingsItem.icon size={18} strokeWidth={1.9} /><span>{settingsItem.label}</span>
        </NavLink>
        <button className="nav-link nav-button" onClick={() => window.alert("Tip: use the search bar to quickly find any task.")}><CircleHelp size={18} /><span>Help & tips</span></button>
      </nav>
      <div className="sidebar-profile">
        <div className="profile-avatar">AS</div>
        <div className="profile-copy"><strong>Akshat Sharma</strong><span>Free workspace</span></div>
        <button className="more-button" aria-label="Profile options">···</button>
      </div>
    </aside>
  );
}
