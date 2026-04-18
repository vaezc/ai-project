const COUNTDOWN_HOURS = 72;

export const missionDeadline = new Date(
  Date.now() + COUNTDOWN_HOURS * 60 * 60 * 1000
);

export function getRemainingMilliseconds(target = missionDeadline) {
  return Math.max(target.getTime() - Date.now(), 0);
}
