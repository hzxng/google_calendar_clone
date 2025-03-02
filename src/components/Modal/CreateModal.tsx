import { useState } from 'react'
import styles from './CreateModal.module.scss'
import cn from 'classnames'

export default function CreateModal() {
  const [title, setTitle] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>
        <i className="material-symbols-outlined">drag_handle</i>
        <i className="material-symbols-outlined">close</i>
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
                    <span>3월 4일(화요일)</span>
                    <span>오전 12:30</span>
                    <span>-</span>
                    <span>오전 1:30</span>
                  </div>
                  <div>시간대 • 반복 안함</div>
                </button>
              )}
              {isClicked && (
                <div className={styles.selects}>
                  <div className={styles.selectTimeWrapper}>
                    <button>3월 4일 (화요일)</button>
                    <button>오전 12:00</button>
                    <span>-</span>
                    <button>오전 1:00</button>
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
        <button className={styles.saveBtn}>저장</button>
      </div>
    </div>
  )
}
