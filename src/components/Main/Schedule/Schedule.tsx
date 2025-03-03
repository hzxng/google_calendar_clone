import { timeformat } from '@utils/formatter'
import styles from './Schedule.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

interface ScheduleProps {
  fullDate: string
  handleClick: (
    e: React.MouseEvent<HTMLDivElement>,
    title: string,
    date: string,
    startTime?: number,
    endTime?: number
  ) => void
}

export default function Schedule({ fullDate, handleClick }: ScheduleProps) {
  const schedules = useSelector(
    (state: RootState) => state.schedule.value.schedules
  )
  const schedule: { title: string; start: number; end: number }[] =
    schedules[fullDate] || []

  return (
    <>
      {schedule.map(({ title, start, end }) => {
        const height = end - start < 1 ? 22 : (end - start) * 48 - 6
        const style = { height: `${height}px`, top: `${start * 48}px` }

        return (
          <div
            className={styles.todo}
            style={style}
            key={`${title}-${start}-${end}`}
            onClick={(e) => handleClick(e, title, fullDate, start, end)}
          >
            {title}
            {end - start < 1 && ', '}
            {end - start >= 1 && <br />}
            {timeformat(start)}~{timeformat(end)}
          </div>
        )
      })}
    </>
  )
}
