export const weekDays = ['일', '월', '화', '수', '목', '금', '토']

export const dateformat = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const timeformat = (time: number, type?: string) => {
  const hour = Math.floor(time)
  const minutes = Math.round((time % 1) * 60)

  const period = hour < 12 ? '오전' : '오후'
  const formattedHour = hour % 12 || 12
  const formattedMinutes = minutes.toString().padStart(2, '0')

  if (type === 'modal') return `${period} ${formattedHour}:${formattedMinutes}`

  return Math.floor(time) === time
    ? `${period} ${formattedHour}시`
    : `${period} ${formattedHour}:${formattedMinutes}`
}

export const modalDateFormat = (date: Date) => {
  const nowMonth = date.getMonth() + 1
  const nowDate = date.getDate()
  const nowDay = weekDays[date.getDay()]

  return `${nowMonth}월 ${nowDate}일 (${nowDay}요일)`
}
