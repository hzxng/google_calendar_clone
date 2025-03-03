import { getWeek } from '@utils/getWeek'
import styles from './Week.module.scss'
import { dateformat, weekDays } from '@utils/formatter'
import cn from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { useState } from 'react'
import CreateModal from '@components/Modal/CreateModal'

export default function Week() {
  const selectedDate = useSelector((state: RootState) => state.date.value)
  const [show, setShow] = useState(false)
  const [fullDate, setFullDate] = useState('')
  const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0,
  })

  const holidays = new Map()
  holidays.set('2025-3-3', ['삼일절'])

  const myAllDaySchedule = useSelector(
    (state: RootState) => state.schedule.value.allDaySchedules
  )

  const week = getWeek(selectedDate)

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    date: string
  ) => {
    setShow(true)
    setFullDate(date)

    const rect = event.currentTarget.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className={styles.weekContainer}>
      <div className={styles.timezone}>
        <div>GMT+09</div>
      </div>
      <div className={styles.week}>
        <div className={styles.weekday}>
          <div className={styles.blank} />
          {week.map(({ fullDate, day }, i) => {
            const todayFullDate = dateformat(new Date())

            return (
              <div
                className={cn(styles.day, {
                  [styles.today]: fullDate === todayFullDate,
                })}
                key={day}
              >
                <div>{weekDays[i]}</div>
                <div>{day}</div>
              </div>
            )
          })}
        </div>
        <div className={styles.schedule}>
          <div className={styles.blank} />
          {week.map(({ fullDate }) => (
            <div
              className={styles.daySchedule}
              key={fullDate}
              onClick={(e) => handleClick(e, fullDate)}
            >
              {myAllDaySchedule[fullDate] &&
                myAllDaySchedule[fullDate].map((title: string) => (
                  <div
                    className={styles.mySchedule}
                    key={`${fullDate}-${title}`}
                  >
                    {title}
                  </div>
                ))}
              {holidays.has(fullDate) &&
                holidays.get(fullDate).map((title: string) => (
                  <div className={styles.holiday} key={`${fullDate}-${title}`}>
                    {title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      {show && (
        <CreateModal
          isOpen={show}
          handleClose={handleClose}
          date={fullDate}
          modalPosition={modalPosition}
        />
      )}
    </div>
  )
}
