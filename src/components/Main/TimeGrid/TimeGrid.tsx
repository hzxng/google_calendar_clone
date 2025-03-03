import { getWeek } from '@utils/getWeek'
import Schedule from '../Schedule/Schedule'
import styles from './TimeGrid.module.scss'
import { useState } from 'react'
import CreateModal from '@components/Modal/CreateModal'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import DeleteModal from '@components/Modal/DeleteModal'

export default function TimeGrid() {
  const [createModalShow, setCreateModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [fullDate, setFullDate] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [createModalPosition, setCreateModalPosition] = useState({
    top: 0,
    left: 0,
  })
  const [deleteModalPosition, setDeleteModalPosition] = useState({
    top: 0,
    left: 0,
  })

  const [scheduleInfo, setScheduleInfo] = useState<{
    title: string
    startTime: number
    endTime: number
  } | null>(null)

  const selectedDate = useSelector((state: RootState) => state.date.value)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const week = getWeek(selectedDate)

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    date: string,
    time: number
  ) => {
    setCreateModalShow(true)
    setFullDate(date)
    setStartTime(time)

    const rect = event.currentTarget.getBoundingClientRect()
    setCreateModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }

  const handleClose = () => {
    setCreateModalShow(false)
    setDeleteModalShow(false)
  }

  return (
    <div className={styles.timeGrid}>
      {week.map(({ fullDate }) => (
        <div className={styles.dayColumn} key={`grid-${fullDate}`}>
          {hours.map((h) => (
            <div
              className={styles.cell}
              key={`${fullDate}-${h}`}
              onClick={(e) => handleClick(e, fullDate, h)}
            />
          ))}

          <Schedule
            fullDate={fullDate}
            setShow={setDeleteModalShow}
            setPosition={setDeleteModalPosition}
            setScheduleInfo={setScheduleInfo}
          />
        </div>
      ))}
      {createModalShow && (
        <CreateModal
          isOpen={createModalShow}
          handleClose={handleClose}
          date={fullDate}
          startTime={startTime}
          modalPosition={createModalPosition}
        />
      )}
      {deleteModalShow && (
        <DeleteModal
          isOpen={deleteModalShow}
          handleClose={handleClose}
          fullDate={fullDate}
          scheduleInfo={scheduleInfo}
          modalPosition={deleteModalPosition}
        />
      )}
    </div>
  )
}
