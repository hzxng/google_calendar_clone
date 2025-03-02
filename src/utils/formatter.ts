export const dateformat = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const timeformat = (time: number) => {
  return time < 12 ? `오전 ${time}시` : `오후 ${time % 12 || 12}시`
}
