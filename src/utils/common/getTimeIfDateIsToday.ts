export function getTimeIfDateIsToday(dateToConvert: string) {
  const date = new Date(dateToConvert);
  const today = new Date();

  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  return null; // 오늘이 아니면 null 반환
}
