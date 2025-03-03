import { getWeek } from '@utils/getWeek'

export const calendarTitle = (selectedDate: Date) => {
  const week = getWeek(selectedDate)
  const selectedYear = selectedDate.getFullYear()
  const selectedMonth = selectedDate.getMonth() + 1

  const isMixedYearWeek = week.some((w) => w.year !== selectedYear)
  const mixedMonthWeek = week.find((w) => w.month !== selectedMonth)

  if (!mixedMonthWeek) return `${selectedYear}년 ${selectedMonth}월`

  const { year: mixedYear, month: mixedMonth } = mixedMonthWeek

  if (isMixedYearWeek) {
    return mixedYear < selectedYear
      ? `${mixedYear}년 ${mixedMonth}월 – ${selectedYear}년 ${selectedMonth}월`
      : `${selectedYear}년 ${selectedMonth}월 – ${mixedYear}년 ${mixedMonth}월`
  }

  return mixedMonth < selectedMonth
    ? `${selectedYear}년 ${mixedMonth}월 – ${selectedMonth}월`
    : `${selectedYear}년 ${selectedMonth}월 – ${mixedMonth}월`
}
