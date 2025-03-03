import { timeformat } from '@utils/formatter'
import styles from './Schedule.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@store/store'

export default function Schedule({
  fullDate,
  setShow,
  setPosition,
  setScheduleInfo,
}: {
  fullDate: string
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setPosition: React.Dispatch<
    React.SetStateAction<{
      top: number
      left: number
    }>
  >
  setScheduleInfo: React.Dispatch<
    React.SetStateAction<{
      title: string
      startTime: number
      endTime: number
    } | null>
  >
}) {
  const schedules = useSelector(
    (state: RootState) => state.schedule.value.schedules
  )
  const schedule: { title: string; start: number; end: number }[] =
    schedules[fullDate] || []

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    title: string,
    startTime: number,
    endTime: number
  ) => {
    setScheduleInfo({ title, startTime, endTime })
    setShow(true)

    const rect = event.currentTarget.getBoundingClientRect()
    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }

  return (
    <>
      {schedule.map(({ title, start, end }) => (
        <div
          className={styles.todo}
          style={{
            height: `${end - start < 1 ? 22 : (end - start) * 48 - 6}px`,
            top: `${start * 48}px`,
          }}
          key={`${title}-${start}-${end}`}
          onClick={(e) => handleClick(e, title, start, end)}
        >
          {end - start < 1 ? (
            <>
              {title}, {timeformat(start)}~{timeformat(end)}
            </>
          ) : (
            <>
              {title}
              <br />
              {timeformat(start)}~{timeformat(end)}
            </>
          )}
        </div>
      ))}
    </>
  )
}
