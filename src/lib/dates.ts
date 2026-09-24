// Small date helpers shared by the seed data and the booking flow.
// Everything is generated relative to "now" so the demo never shows a
// booking slot or session sitting in the past, whatever day it's opened.

export const DAY_MS = 86_400_000

export function addDays(base: Date, n: number): Date {
  return new Date(base.getTime() + n * DAY_MS)
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function todayISO(): string {
  return isoDate(new Date())
}

export function longDayLabel(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })
}

export function shortDayLabel(d: Date): string {
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
}

export function dateOnlyLabel(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

/** "Today" / "Yesterday" / "3 days ago" / a plain date once it's far enough back. */
export function relativeDayLabel(iso: string): string {
  const diffDays = Math.round((new Date(todayISO()).getTime() - new Date(iso).getTime()) / DAY_MS)
  if (diffDays <= 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 14) return `${diffDays} days ago`
  return dateOnlyLabel(new Date(iso))
}

/** Dhaka's business week runs Sunday–Thursday. */
export function isDhakaWorkday(d: Date): boolean {
  const day = d.getDay() // 0 = Sun ... 6 = Sat
  return day !== 5 && day !== 6
}

export type WorkdaySlot = { date: Date; iso: string; dayLabel: string; time: string }

/** The next `count` Dhaka working days, starting the day after `from`, cycling through `times`. */
export function nextWorkdaySlots(count: number, times: string[], from: Date = new Date()): WorkdaySlot[] {
  const slots: WorkdaySlot[] = []
  let cursor = addDays(from, 1)
  let timeIdx = 0
  while (slots.length < count) {
    if (isDhakaWorkday(cursor)) {
      slots.push({ date: cursor, iso: isoDate(cursor), dayLabel: longDayLabel(cursor), time: times[timeIdx % times.length] })
      timeIdx++
    }
    cursor = addDays(cursor, 1)
  }
  return slots
}
