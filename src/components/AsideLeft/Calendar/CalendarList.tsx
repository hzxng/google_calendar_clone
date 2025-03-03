import styles from './CalendarList.module.scss'
import { ReactComponent as PlusIcon } from '@assets/images/plus.svg'

export default function CalendarList() {
  const MY_CALENDAR_LIST = [
    {
      title: '장하정',
      color: '#039be5',
    },
    {
      title: '생일',
      color: '#33b679',
    },
    {
      title: 'Tasks',
      color: '#4285f4',
    },
  ]

  const OTHER_CALENDAR_LIST = [
    {
      title: '대한민국의 휴일',
      color: '#0b8043',
    },
  ]

  return (
    <div className={styles.calendarListContainer}>
      {['내 캘린더', '다른 캘린더'].map((title) => (
        <div className={styles.calendarListWrapper} key={title}>
          <button className={styles.viewCalendarBtn}>
            <div>{title}</div>
            {title === '내 캘린더' ? (
              <i className="material-symbols-outlined">keyboard_arrow_up</i>
            ) : (
              <div className={styles.iconWrapper}>
                <div className={styles.plusIcon}>
                  <PlusIcon width={20} height={20} />
                </div>
                <i className="material-symbols-outlined">keyboard_arrow_up</i>
              </div>
            )}
          </button>

          <div className={styles.calendarList}>
            {(title === '내 캘린더'
              ? MY_CALENDAR_LIST
              : OTHER_CALENDAR_LIST
            ).map((calendar) => (
              <div className={styles.calendarItem} key={calendar.title}>
                <div className={styles.checkBox}>
                  <div
                    className={styles.iconWrapper}
                    style={{ backgroundColor: calendar.color }}
                  >
                    <i className="material-symbols-outlined">check</i>
                  </div>
                </div>
                <div>{calendar.title}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
