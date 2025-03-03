import { getWeek } from '@utils/getWeek'
import styles from './Week.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import CreateModal from '@components/Modal/CreateModal/CreateModal'
import DeleteModal from '@components/Modal/DeleteModal'
import WeekdayHeader from './WeekHeader'
import ScheduleGrid from './ScheduleGrid'
import { useScheduleHandler } from '@hooks/useScheduleHandler'

export default function Week() {
  const selectedDate = useSelector((state: RootState) => state.date.value)
  const week = getWeek(selectedDate)

  const {
    createModalShow,
    deleteModalShow,
    fullDate,
    scheduleTitle,
    scheduleDate,
    createModalPosition,
    deleteModalPosition,
    handleClick,
    handleScheduleClick,
    handleClose,
  } = useScheduleHandler()

  return (
    <div className={styles.weekContainer}>
      <div className={styles.timezone}>GMT+09</div>
      <div className={styles.week}>
        <WeekdayHeader week={week} />
        <ScheduleGrid
          week={week}
          handleClick={handleClick}
          handleScheduleClick={handleScheduleClick}
        />
      </div>

      {createModalShow && (
        <CreateModal
          handleClose={handleClose}
          date={fullDate}
          modalPosition={createModalPosition}
        />
      )}
      {deleteModalShow && (
        <DeleteModal
          handleClose={handleClose}
          fullDate={fullDate}
          scheduleInfo={{
            title: scheduleTitle,
            date: scheduleDate,
          }}
          modalPosition={deleteModalPosition}
        />
      )}
    </div>
  )
}
