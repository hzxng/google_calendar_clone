import { timeformat } from '@utils/formatter'
import styles from './Schedule.module.scss'

export default function Schedule({ date }: { date: string }) {
  const mySchedule = new Map()
  mySchedule.set('2025-3-2', [
    {
      title: '과제3',
      start: 10,
      end: 15,
    },
  ])

  const schedule: { title: string; start: number; end: number }[] =
    mySchedule.get(date) || []

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
