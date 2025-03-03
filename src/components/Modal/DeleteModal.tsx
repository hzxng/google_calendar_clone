import styles from './DeleteModal.module.scss'
import Modal from './Modal'
import { ReactComponent as ShareIcon } from '@assets/images/share.svg'
import { ReactComponent as AlarmIcon } from '@assets/images/alarm.svg'
import { modalDateFormat, timeformat } from '@utils/formatter'
import { deleteSchedule } from '@store/schedule'
import { useDispatch } from 'react-redux'

interface DeleteModalType {
  handleClose: () => void
  date: Date
  fullDate: string
  scheduleInfo: {
    title: string
    startTime: number
    endTime: number
  } | null
  modalPosition: {
    top: number
    left: number
  }
}

export default function DeleteModal({
  handleClose,
  date,
  fullDate,
  scheduleInfo,
  modalPosition,
}: DeleteModalType) {
  const dispatch = useDispatch()

  const handleDeleteSchedule = () => {
    dispatch(deleteSchedule({ date: fullDate, schedule: scheduleInfo }))
    handleClose()
  }

  return (
    <Modal
      handleClose={handleClose}
      type="delete"
      handleDelete={handleDeleteSchedule}
      modalPosition={modalPosition}
    >
      <div className={styles.titleWrapper}>
        <div className={styles.badge} />
        <div className={styles.title}>
          <div>{scheduleInfo?.title}</div>
          <div className={styles.time}>
            <span>{modalDateFormat(date)}</span>
            <span>•</span>
            <span>
              {timeformat(scheduleInfo?.startTime || 0, 'modal')}~{' '}
              {timeformat(scheduleInfo?.endTime || 0, 'modal')}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.shareBtn}>
        <button>
          <ShareIcon width={18} height={18} fill="#0b57d0" />
          <span>링크를 통해 초대</span>
        </button>
      </div>
      <div className={styles.scheduleInfo}>
        <AlarmIcon />
        <span>30분 전</span>
      </div>
      <div className={styles.scheduleInfo}>
        <i className="material-symbols-outlined">event</i>
        <span>장하정</span>
      </div>
    </Modal>
  )
}
