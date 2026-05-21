const DAY_MS = 1000 * 60 * 60 * 24

export function calculateRemainingDays(targetDate) {
  return Math.max(0, Math.ceil((new Date(targetDate).getTime() - Date.now()) / DAY_MS))
}
