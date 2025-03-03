import { useEffect, useState } from 'react'
import styles from './CreateModal.module.scss'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { createAllDaySchedule, createSchedule } from '@store/schedule'
import { modalDateFormat, timeformat } from '@utils/formatter'
import SelectBar from '@components/SelectBar/SelectBar'
import Modal from './Modal'

export default function CreateModal({
  isOpen,
  handleClose,
  date,
  startTime,
  modalPosition,
}: {
  isOpen: boolean
  handleClose: () => void
  date: string
  startTime?: number
  modalPosition: {
    top: number
    left: number
  }
}) {
  const [title, setTitle] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [selectedStart, setSelectedStart] = useState<number>(startTime || 0)
  const [selectedEnd, setSelectedEnd] = useState<number>(selectedStart + 1)
  const [selectedRepeat, setSelectedRepeat] = useState<string>('반복 안함')
  const [isCheckAllDay, setIsCheckAllDay] = useState(false)

  const maxLeftPosition = modalPosition.left - 470 < 82.1875
  const maxTopPosition = modalPosition.top - 100 > 388

  const customModalPosition = {
    top: maxTopPosition ? '388px' : `${modalPosition.top - 100}px`,
    left: maxLeftPosition
      ? `${modalPosition.left + 100}px`
      : `${modalPosition.left - 470}px`,
  }

  const dispatch = useDispatch()

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
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      modalPosition={customModalPosition}
    >
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
              {!isClicked && (
                <button
                  className={styles.timeWrapper}
                  onClick={() => setIsClicked(true)}
                >
                  <div>
                    <span>{modalDateFormat(new Date(date))}</span>
                    {startTime ? (
                      <>
                        <span>{timeformat(selectedStart, 'modal')}</span>
                        <span>-</span>
                        <span>{timeformat(selectedEnd, 'modal')}</span>
                      </>
                    ) : (
                      <>
                        <span>-</span>
                        <span>{modalDateFormat(new Date(date))}</span>
                      </>
                    )}
                  </div>
                  <div>시간대 • 반복 안함</div>
                </button>
              )}
              {isClicked && (
                <div className={styles.selects}>
                  <div className={styles.selectTimeWrapper}>
                    <button>{modalDateFormat(new Date(date))}</button>
                    {isCheckAllDay ? (
                      <>
                        <span>-</span>
                        <button>{modalDateFormat(new Date(date))}</button>
                      </>
                    ) : (
                      <>
                        <SelectBar
                          selectType="time"
                          setOption={setSelectedStart}
                          optionValue={selectedStart}
                        />
                        <span>-</span>
                        <SelectBar
                          selectType="time"
                          setOption={setSelectedEnd}
                          optionValue={selectedEnd}
                          startTime={selectedStart}
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <div className={styles.checkAllDay}>
                      <label>
                        <input
                          type="checkbox"
                          checked={isCheckAllDay}
                          onChange={(e) => setIsCheckAllDay(e.target.checked)}
                        />
                        종일
                      </label>
                      <span>시간대</span>
                    </div>
                    <SelectBar
                      selectType="repeat"
                      setOption={setSelectedRepeat}
                      optionValue={selectedRepeat}
                      hasArrow
                    />
                  </div>
                </div>
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
