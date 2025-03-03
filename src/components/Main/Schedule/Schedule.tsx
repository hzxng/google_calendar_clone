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
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    title: string,
    startTime: number,
    endTime: number
  ) => {
    setScheduleInfo({ title, startTime, endTime })
    setShow(true)

    const rect = event.currentTarget.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
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
          onClick={(e) => handleClick(e, title, start, end)}
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
          modalPosition={modalPosition}
        />
      )}
    </>
  )
}
