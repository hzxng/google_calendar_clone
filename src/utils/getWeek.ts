import { dateformat } from './formatter'

export const getWeek = (date: Date) => {
  const dayOfWeek = date.getDay()
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - dayOfWeek)

  const week: { date: Date; fullDate: string; day: number }[] = []

  for (let i = 0; i < 7; i++) {
    const current = new Date(startOfWeek)
    current.setDate(startOfWeek.getDate() + i)

    week.push({
      date: current,
      fullDate: dateformat(current),
      day: current.getDate(),
    })
  }

  return week
}
