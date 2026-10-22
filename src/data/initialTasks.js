const today = new Date();
const dateOffset = (offset) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const initialTasks = [
  { id: "t1", title: "Finalize portfolio homepage", description: "Polish hero section, responsive spacing, and project cards.", category: "Work", priority: "High", dueDate: dateOffset(0), completed: false, createdAt: new Date().toISOString() },
  { id: "t2", title: "Practice JavaScript array methods", description: "Revise map, filter, reduce, and solve two practice questions.", category: "Learning", priority: "High", dueDate: dateOffset(0), completed: false, createdAt: new Date().toISOString() },
  { id: "t3", title: "Review weekly goals", description: "Check progress and decide the three most important outcomes.", category: "Personal", priority: "Medium", dueDate: dateOffset(0), completed: true, createdAt: new Date().toISOString() },
  { id: "t4", title: "Read 10 pages", description: "A small daily habit to stay consistent.", category: "Personal", priority: "Low", dueDate: dateOffset(1), completed: false, createdAt: new Date().toISOString() },
  { id: "t5", title: "Build reusable React components", description: "Create a clean Button, Modal, and EmptyState component.", category: "Learning", priority: "Medium", dueDate: dateOffset(2), completed: false, createdAt: new Date().toISOString() },
  { id: "t6", title: "Organize project repository", description: "Update README and remove unused files.", category: "Work", priority: "Low", dueDate: dateOffset(-1), completed: false, createdAt: new Date().toISOString() },
  { id: "t7", title: "Plan next week's study sessions", description: "Make a realistic schedule for college and coding.", category: "Personal", priority: "Medium", dueDate: dateOffset(4), completed: true, createdAt: new Date().toISOString() },
];
