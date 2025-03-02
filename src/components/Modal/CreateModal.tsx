import { useEffect, useState } from 'react'
import styles from './CreateModal.module.scss'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { createSchedule } from '@store/schedule'
import { modalDateFormat, timeformat } from '@utils/formatter'

export default function CreateModal({
  handleClose,
  date,
  time,
}: {
  handleClose: () => void
  date: string
  time: number
}) {
  const [title, setTitle] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [selectedStart, setSelectedStart] = useState<number>(time)
  const [selectedEnd, setSelectedEnd] = useState<number>(time + 1)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsFocus(true)
  }, [])

  const handleClickSave = () => {
    const newSchedule = { title, start: selectedStart, end: selectedEnd }
    dispatch(createSchedule({ date, newSchedule }))

    handleClose()
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <i className="material-symbols-outlined">drag_handle</i>
        <i className="material-symbols-outlined" onClick={handleClose}>
          close
        </i>
      </div>
      <div className={styles.modalBody}>
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
                    <span>{timeformat(time, 'modal')}</span>
                    <span>-</span>
                    <span>{timeformat(time + 1, 'modal')}</span>
                  </div>
                  <div>시간대 • 반복 안함</div>
                </button>
              )}
              {isClicked && (
                <div className={styles.selects}>
                  <div className={styles.selectTimeWrapper}>
                    <button>{modalDateFormat(new Date(date))}</button>
                    <button>{timeformat(selectedStart, 'modal')}</button>
                    <span>-</span>
                    <button>{timeformat(selectedEnd, 'modal')}</button>
                  </div>
                  <div>
                    <div className={styles.checkAllDay}>
                      <label>
                        <input type="checkbox" />
                        종일
                      </label>
                      <span>시간대</span>
                    </div>
                    <button className={styles.repeatBtn}>
                      반복 안함
                      <i className="material-symbols-outlined">
                        arrow_drop_down
                      </i>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.option}>옵션 더보기</button>
        <button className={styles.saveBtn} onClick={handleClickSave}>
          저장
        </button>
      </div>
    </div>
  )
}
