export const weekDays = ['일', '월', '화', '수', '목', '금', '토']

export const dateformat = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const timeformat = (time: number, type?: string) => {
  if (type === 'modal') {
    if (time === 0) return `오전 12:00`
    return time < 12 ? `오전 ${time}:00` : `오후 ${time % 12 || 12}:00`
  }
  return time < 12 ? `오전 ${time}시` : `오후 ${time % 12 || 12}시`
}

export const modalDateFormat = (date: Date) => {
  const nowMonth = date.getMonth() + 1
  const nowDate = date.getDate()
  const nowDay = weekDays[date.getDay()]

  return `${nowMonth}월 ${nowDate}일 (${nowDay}요일)`
}
