export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export const generateCalendarDays = (currentDate) => {
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const firstDayOfWeek = (startOfMonth.getDay() + 6) % 7; // Adjust Sunday to 6 (ISO week)
  const totalDaysInMonth = endOfMonth.getDate();

  const days = [];

  // Add previous month's trailing days
  const prevMonthLastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  for (let i = firstDayOfWeek; i > 0; i--) {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      prevMonthLastDay - i + 1
    );
    days.push({
      date: prevDate.toISOString().split("T")[0],
      isCurrentMonth: false,
    });
  }

  // Add current month's days
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    days.push({ date: date.toISOString().split("T")[0], isCurrentMonth: true });
  }

  // Add next month's leading days to complete the 6-row grid (42 cells)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      i
    );
    days.push({
      date: nextDate.toISOString().split("T")[0],
      isCurrentMonth: false,
    });
  }

  return days;
};
