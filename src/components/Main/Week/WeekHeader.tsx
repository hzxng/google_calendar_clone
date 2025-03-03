import styles from './WeekHeader.module.scss'
import { dateformat, weekDays } from '@utils/formatter'
import cn from 'classnames'

export default function WeekdayHeader({
  week,
}: {
  week: {
    date: Date
    fullDate: string
    year: number
    month: number
    day: number
  }[]
}) {
  return (
    <div className={styles.weekday}>
      <div className={styles.blank} />
      {week.map(({ fullDate, day }, i) => {
        const todayFullDate = dateformat(new Date())

        return (
          <div
            className={cn(styles.day, {
              [styles.today]: fullDate === todayFullDate,
            })}
            key={day}
          >
            <div>{weekDays[i]}</div>
            <div>{day}</div>
          </div>
        )
      })}
    </div>
  )
}
