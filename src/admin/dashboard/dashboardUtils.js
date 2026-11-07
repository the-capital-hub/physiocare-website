export function displayValue(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map(displayValue).join(", ");
  if (typeof value === "object") return value.name || value.fullName || value.title || value._id || "—";
  return String(value);
}

export function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}
