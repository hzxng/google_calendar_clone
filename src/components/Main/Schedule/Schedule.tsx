import { timeformat } from '@utils/formatter'
import styles from './Schedule.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { useState } from 'react'
import DeleteModal from '@components/Modal/DeleteModal'

export default function Schedule({
  date,
  fullDate,
}: {
  date: Date
  fullDate: string
}) {
  const schedules = useSelector(
    (state: RootState) => state.schedule.value.schedules
  )
  const schedule: { title: string; start: number; end: number }[] =
    schedules[fullDate] || []

  const [show, setShow] = useState(false)
  const [scheduleInfo, setScheduleInfo] = useState<{
    title: string
    startTime: number
    endTime: number
  } | null>(null)

  const handleClick = (title: string, startTime: number, endTime: number) => {
    setScheduleInfo({ title, startTime, endTime })
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

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
          onClick={() => handleClick(title, start, end)}
        >
          {title}
          <br />
          {timeformat(start)}~{timeformat(end)}
        </div>
      ))}
      {show && (
        <DeleteModal
          handleClose={handleClose}
          date={date}
          fullDate={fullDate}
          scheduleInfo={scheduleInfo}
        />
      )}
    </>
  )
}
