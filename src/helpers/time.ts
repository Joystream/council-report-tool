const A_SECOND = 1000;
const A_MINUTE = 60 * A_SECOND;
const AN_HOUR = 60 * A_MINUTE;
export const A_DAY = 24 * AN_HOUR;

export function dayRange(start: Date, end: Date): number[] {
  const startDay = new Date(start.toISOString().split("T")[0]).getTime();
  const endDay = new Date(end.toISOString().split("T")[0]).getTime() + A_DAY;
  const length = (endDay - startDay) / A_DAY;
  return Array.from({ length }, (_, i) => startDay + i * A_DAY);
}
