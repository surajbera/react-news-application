export function formatDate(dateStr: string) {
  if (!dateStr) {
    return "Date not available";
  }

  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
