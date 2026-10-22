export const parseISO = (value) => {
  if (!value) return new Date("invalid");
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export function isToday(value) {
  if (!value) return false;
  const date = parseISO(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
}

export function isTomorrow(value) {
  if (!value) return false;
  const date = parseISO(value);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate();
}

export function formatDate(value, options = { month: "short", day: "numeric" }) {
  if (!value) return "No due date";
  const date = parseISO(value);
  if (Number.isNaN(date.getTime())) return "No due date";
  return new Intl.DateTimeFormat("en-IN", options).format(date);
}

export function dueLabel(value) {
  if (!value) return "No due date";
  if (isToday(value)) return "Today";
  if (isTomorrow(value)) return "Tomorrow";
  return formatDate(value);
}

export function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
