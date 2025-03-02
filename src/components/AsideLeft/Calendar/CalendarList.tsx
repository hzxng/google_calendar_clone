import styles from './CalendarList.module.scss'
import { ReactComponent as PlusIcon } from '@assets/images/plus.svg'

export default function CalendarList() {
  const MY_CALENDAR_LIST = [
    {
      title: '장하정',
      color: 'rgb(3, 155, 229)',
    },
    {
      title: '생일',
      color: 'rgb(51, 182, 121)',
    },
    {
      title: 'Tasks',
      color: 'rgb(66, 133, 244)',
    },
  ]

  const OTHER_CALENDAR_LIST = [
    {
      title: '대한민국의 휴일',
      color: 'rgb(11, 128, 67)',
    },
  ]

  return (
    <div className={styles.calendarListContainer}>
      <div className={styles.calendarListWrapper}>
        <button className={styles.viewCalendarBtn}>
          <div>내 캘린더</div>
          <i className="material-symbols-outlined">keyboard_arrow_up</i>
        </button>
        <div className={styles.calendarList}>
          {MY_CALENDAR_LIST.map((calendar) => (
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
      <div className={styles.calendarListWrapper}>
        <button className={styles.viewCalendarBtn}>
          <div>다른 캘린더</div>
          <div className={styles.iconWrapper}>
            <div className={styles.plusIcon}>
              <PlusIcon width={20} height={20} />
            </div>
            <i className="material-symbols-outlined">keyboard_arrow_up</i>
          </div>
        </button>
        <div className={styles.calendarList}>
          {OTHER_CALENDAR_LIST.map((calendar) => (
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
    </div>
  )
}
