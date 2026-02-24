export function toDateTime(session) {
  return new Date(`${session.data.date}T${session.data.start_time}:00`);
}

export function isUpcoming(session) {
  const now = new Date();
  return toDateTime(session) >= new Date(now.toDateString());
}

export function sortSessions(list) {
  return [...list].sort((a, b) => toDateTime(a) - toDateTime(b));
}
