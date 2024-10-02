function getDaysLeft(start: string) {
  const startDate = new Date(start);
  const today = new Date();

  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDateStart = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );

  const timeDiff = startDateStart.getTime() - todayStart.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

export default getDaysLeft;
