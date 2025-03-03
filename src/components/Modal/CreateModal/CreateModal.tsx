import { useEffect, useState } from 'react'
import styles from './CreateModal.module.scss'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { createAllDaySchedule, createSchedule } from '@store/schedule'
import Modal from '../Modal'
import { getCustomModalPosition } from '@utils/getCustomModalPosition'
import TimeSelection from './TimeSelection'
import TimeSelectionForm from './TimeSelectionForm'

interface CreateModalProps {
  handleClose: () => void
  date: string
  startTime?: number
  modalPosition: {
    top: number
    left: number
  }
}

export default function CreateModal({
  handleClose,
  date,
  startTime,
  modalPosition,
}: CreateModalProps) {
  const [title, setTitle] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [selectedStart, setSelectedStart] = useState<number>(startTime || 0)
  const [selectedEnd, setSelectedEnd] = useState<number>(selectedStart + 1)
  const [selectedRepeat, setSelectedRepeat] = useState<string>('반복 안함')
  const [isCheckAllDay, setIsCheckAllDay] = useState(false)

  const dispatch = useDispatch()
  const customModalPosition = getCustomModalPosition(modalPosition, 388)

  useEffect(() => {
    setIsFocus(true)
  }, [])

  const handleClickSave = () => {
    const scheduleTitle = title || '(제목 없음)'
    if (startTime && !isCheckAllDay) {
      const newSchedule = {
        title: scheduleTitle,
        start: selectedStart,
        end: selectedEnd,
      }
      dispatch(createSchedule({ date, newSchedule }))
    } else {
      dispatch(createAllDaySchedule({ date, allDayEvent: scheduleTitle }))
    }

    handleClose()
  }

  return (
    <Modal handleClose={handleClose} modalPosition={customModalPosition}>
      <div className={styles.container}>
        <div className={styles.title}>
          <input
            className={cn({ [styles.focus]: isFocus })}
            placeholder="제목 추가"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocus(true)}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <button className={styles.active}>이벤트</button>
            <button>할 일</button>
            <button>약속 일정</button>
          </div>
          <div className={styles.settings}>
            <div className={styles.timeSetting}>
              <i className="material-symbols-outlined">access_time</i>
              {!isClicked ? (
                <TimeSelection
                  setIsClicked={setIsClicked}
                  date={date}
                  startTime={startTime}
                  selectedStart={selectedStart}
                  selectedEnd={selectedEnd}
                />
              ) : (
                <TimeSelectionForm
                  date={date}
                  isCheckAllDay={isCheckAllDay}
                  setIsCheckAllDay={setIsCheckAllDay}
                  selectedStart={selectedStart}
                  selectedEnd={selectedEnd}
                  setSelectedStart={setSelectedStart}
                  setSelectedEnd={setSelectedEnd}
                  selectedRepeat={selectedRepeat}
                  setSelectedRepeat={setSelectedRepeat}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.option}>옵션 더보기</button>
        <button className={styles.saveBtn} onClick={handleClickSave}>
          저장
        </button>
      </div>
    </Modal>
  )
}
