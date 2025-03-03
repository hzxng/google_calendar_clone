import { getWeek } from '@utils/getWeek'
import Schedule from '../Schedule/Schedule'
import styles from './TimeGrid.module.scss'
import { useState } from 'react'
import CreateModal from '@components/Modal/CreateModal'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export default function TimeGrid() {
  const [show, setShow] = useState(false)
  const [fullDate, setFullDate] = useState('')
  const [startTime, setStartTime] = useState(0)
  const selectedDate = useSelector((state: RootState) => state.date.value)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const week = getWeek(selectedDate)

  const handleClick = (date: string, time: number) => {
    setShow(true)
    setFullDate(date)
    setStartTime(time)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className={styles.timeGrid}>
      {week.map(({ date, fullDate }) => (
        <div className={styles.dayColumn} key={`grid-${fullDate}`}>
          {hours.map((h) => (
            <div
              className={styles.cell}
              key={`${fullDate}-${h}`}
              onClick={() => handleClick(fullDate, h)}
            />
          ))}

          <Schedule date={date} fullDate={fullDate} />
        </div>
      ))}
      {show && (
        <CreateModal
          handleClose={handleClose}
          date={fullDate}
          startTime={startTime}
        />
      )}
    </div>
  )
}
