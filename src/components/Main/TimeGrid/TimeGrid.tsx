import { getWeek } from '@utils/getWeek'
import Schedule from '../Schedule/Schedule'
import styles from './TimeGrid.module.scss'
import CreateModal from '@components/Modal/CreateModal/CreateModal'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import DeleteModal from '@components/Modal/DeleteModal'
import { useScheduleHandler } from '@hooks/useScheduleHandler'

export default function TimeGrid() {
  const selectedDate = useSelector((state: RootState) => state.date.value)
  const week = getWeek(selectedDate)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  const {
    createModalShow,
    deleteModalShow,
    fullDate,
    startTime,
    scheduleInfo,
    createModalPosition,
    deleteModalPosition,
    handleClick,
    handleScheduleClick,
    handleClose,
  } = useScheduleHandler()

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

          <Schedule fullDate={fullDate} handleClick={handleScheduleClick} />
        </div>
      ))}

      {createModalShow && (
        <CreateModal
          handleClose={handleClose}
          date={fullDate}
          startTime={startTime}
          modalPosition={createModalPosition}
        />
      )}
      {deleteModalShow && (
        <DeleteModal
          handleClose={handleClose}
          fullDate={fullDate}
          scheduleInfo={scheduleInfo}
          modalPosition={deleteModalPosition}
        />
      )}
    </div>
  )
}
