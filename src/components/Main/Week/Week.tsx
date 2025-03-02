import { getWeek } from '@utils/getWeek'
import styles from './Week.module.scss'
import { dateformat } from '@utils/formatter'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export default function Week() {
  const selectedDate = useSelector((state: RootState) => state.date.value)
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  const holidays = new Map()
  holidays.set('2025-3-3', ['삼일절'])

  const myAllDaySchedule = new Map()
  myAllDaySchedule.set('2025-3-2', ['과제1', '과제2'])

  const week = getWeek(selectedDate)

  return (
    <div className={styles.weekContainer}>
      <div className={styles.timezone}>
        <div>GMT+09</div>
      </div>
      <div className={styles.week}>
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
        <div className={styles.schedule}>
          <div className={styles.blank} />
          {week.map(({ fullDate }) => (
            <div className={styles.daySchedule} key={fullDate}>
              {myAllDaySchedule.has(fullDate) &&
                myAllDaySchedule.get(fullDate).map((title: string) => (
                  <div
                    className={styles.mySchedule}
                    key={`${fullDate}-${title}`}
                  >
                    {title}
                  </div>
                ))}
              {holidays.has(fullDate) &&
                holidays.get(fullDate).map((title: string) => (
                  <div className={styles.holiday} key={`${fullDate}-${title}`}>
                    {title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
