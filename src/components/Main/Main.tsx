import styles from './Main.module.scss'
import cn from 'classnames'

export default function Main() {
  const dateformat = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  const getWeek = (date: Date) => {
    const dayOfWeek = date.getDay()
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - dayOfWeek)

    const week: { date: Date; fullDate: string; day: number }[] = []

    for (let i = 0; i < 7; i++) {
      const current = new Date(startOfWeek)
      current.setDate(startOfWeek.getDate() + i)

      week.push({
        date: current,
        fullDate: dateformat(current),
        day: current.getDate(),
      })
    }

    return week
  }

  const timeformat = (time: number) => {
    return time < 12 ? `오전 ${time}시` : `오후 ${time % 12 || 12}시`
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  const holidays = new Map()
  holidays.set('2025-3-3', ['삼일절'])

  const myAllDaySchedule = new Map()
  myAllDaySchedule.set('2025-3-2', ['과제1', '과제2'])

  const mySchedule = new Map()
  mySchedule.set('2025-3-2', [
    {
      title: '과제3',
      start: 10,
      end: 15,
    },
  ])

  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.timezone}>
          <div>GMT+09</div>
        </div>
        <div className={styles.week}>
          <div className={styles.weekday}>
            <div className={styles.blank} />
            {getWeek(new Date()).map(({ fullDate, day }, i) => {
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
            {getWeek(new Date()).map(({ fullDate }) => (
              <div className={styles.daySchedule} key={fullDate}>
                {myAllDaySchedule.has(fullDate) &&
                  myAllDaySchedule.get(fullDate).map((title: string) => (
                    <div
                      className={styles.mySchedule}
                      key={`${fullDate}-${title}`}
                    >
                      {title}
                    </div>
                  ))}
                {holidays.has(fullDate) &&
                  holidays.get(fullDate).map((title: string) => (
                    <div
                      className={styles.holiday}
                      key={`${fullDate}-${title}`}
                    >
                      {title}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.time}>
          {hours.map((hour) => (
            <div className={styles.hour} key={hour}>
              {hour !== 0 && <span>{timeformat(hour)}</span>}
            </div>
          ))}
        </div>
        <div className={styles.timeGridWrapper}>
          <div className={styles.blank}>
            {hours.map((_, i) => (
              <div className={styles.hour} key={`hour-${i}`} />
            ))}
          </div>
          <div className={styles.timeGrid}>
            {getWeek(new Date()).map(({ fullDate }) => (
              <div className={styles.hour} key={`gird-${fullDate}`}>
                {hours.map((h) => (
                  <div className={styles.cell} key={`${fullDate}-${h}`} />
                ))}
                {mySchedule.has(fullDate) &&
                  mySchedule
                    .get(fullDate)
                    .map(
                      ({
                        title,
                        start,
                        end,
                      }: {
                        title: string
                        start: number
                        end: number
                      }) => (
                        <div
                          className={styles.todo}
                          style={{
                            height: `${(end - start) * 48 - 6}px`,
                            top: `${start * 48}px`,
                          }}
                        >
                          {title}
                          <br />
                          {timeformat(start)}~{timeformat(end)}
                        </div>
                      )
                    )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
