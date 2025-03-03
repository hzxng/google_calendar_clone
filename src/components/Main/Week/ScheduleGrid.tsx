import { useSelector } from 'react-redux'
import styles from './ScheduleGrid.module.scss'
import { RootState } from '@store/store'
import { holidays } from '@constants/holidays'

interface ScheduleGridProps {
  week: {
    date: Date
    fullDate: string
    year: number
    month: number
    day: number
  }[]
  handleClick: (e: React.MouseEvent<HTMLDivElement>, date: string) => void
  handleScheduleClick: (
    e: React.MouseEvent<HTMLDivElement>,
    date: string,
    title: string
  ) => void
}

export default function ScheduleGrid({
  week,
  handleClick,
  handleScheduleClick,
}: ScheduleGridProps) {
  const myAllDaySchedule = useSelector(
    (state: RootState) => state.schedule.value.allDaySchedules
  )

  return (
    <div className={styles.schedule}>
      <div className={styles.blank} />
      {week.map(({ fullDate }) => (
        <div
          className={styles.daySchedule}
          key={fullDate}
          onClick={(e) => handleClick(e, fullDate)}
        >
          {myAllDaySchedule[fullDate]?.map((title) => (
            <div
              className={styles.mySchedule}
              key={`${fullDate}-${title}`}
              onClick={(e) => handleScheduleClick(e, title, fullDate)}
            >
              {title}
            </div>
          ))}
          {holidays[fullDate]?.map((title) => (
            <div
              className={styles.holiday}
              key={`${fullDate}-${title}`}
              onClick={(e) => e.stopPropagation()}
            >
              {title}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
