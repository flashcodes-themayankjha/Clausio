export function getClauseIcon(title) {
  const lower = title.toLowerCase();
  if (lower.includes("payment")) return "💰";
  if (lower.includes("delivery")) return "🚚";
  if (lower.includes("sla") || lower.includes("uptime")) return "⏱️";
  if (lower.includes("penalt")) return "🧾";
  if (lower.includes("liability")) return "⚖️";
  return "📄";
}

