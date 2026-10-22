# TaskFlow Pro — React To-Do Application

A polished, responsive task management dashboard built with React 18, Vite, React Router, Lucide icons, and plain CSS.

## Features
- Dashboard with productivity stats, completion percentage, daily focus, and recently added tasks
- Create, edit, complete, and delete tasks
- Task filters: All, Today, Upcoming, High Priority, Completed
- Search tasks by title, description, or category
- Monthly calendar with task markers and selected-day agenda
- Insights page with completion, category, and priority breakdowns
- Light/dark theme
- Local storage persistence — refresh the page and tasks remain saved
- Responsive sidebar and mobile layout
- Modal validation, keyboard Escape-to-close, toast notifications, and empty states

## Tech stack
- React 18
- Vite
- React Router DOM v6
- lucide-react
- CSS (no UI framework required)

## Run locally
1. Install Node.js LTS if it is not already installed.
2. Extract this ZIP.
3. Open the `TaskFlow-Pro` folder in VS Code.
4. Open Terminal in the project root (the folder containing `package.json`).
5. Run:

```bash
npm install
npm run dev
```

6. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Project structure

```text
TaskFlow-Pro/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx
    │   │   └── Topbar.jsx
    │   ├── tasks/
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   └── ui/
    │       └── SectionHeader.jsx
    ├── data/
    │   └── initialTasks.js
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Tasks.jsx
    │   ├── CalendarPage.jsx
    │   ├── Analytics.jsx
    │   └── SettingsPage.jsx
    ├── styles/
    │   └── index.css
    └── utils/
        ├── date.js
        └── storage.js
```

## Notes
- This is a frontend-only project; no backend or account login is configured.
- Task data is stored in your browser's local storage. Use Settings → Restore demo tasks to restore the sample list.
- Google Fonts are loaded from the web; system sans-serif fallbacks are provided.
