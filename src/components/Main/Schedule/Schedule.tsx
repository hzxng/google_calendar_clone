import { timeformat } from '@utils/formatter'
import styles from './Schedule.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export default function Schedule({ date }: { date: string }) {
  const schedules = useSelector(
    (state: RootState) => state.schedule.value.schedules
  )

  const schedule: { title: string; start: number; end: number }[] =
    schedules[date] || []

  return (
    <>
      {schedule.map(({ title, start, end }) => (
        <div
          className={styles.todo}
          style={{
            height: `${(end - start) * 48 - 6}px`,
            top: `${start * 48}px`,
          }}
          key={`${title}-${start}-${end}`}
        >
          {title}
          <br />
          {timeformat(start)}~{timeformat(end)}
        </div>
      ))}
    </>
  )
}
