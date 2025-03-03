import { modalDateFormat, timeformat } from '@utils/formatter'
import styles from './TimeSelection.module.scss'

interface TimeSelectionProps {
  setIsClicked: (value: boolean) => void
  date: string
  startTime?: number
  selectedStart: number
  selectedEnd: number
}

export default function TimeSelection({
  setIsClicked,
  date,
  startTime,
  selectedStart,
  selectedEnd,
}: TimeSelectionProps) {
  return (
    <button className={styles.timeWrapper} onClick={() => setIsClicked(true)}>
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
  )
}
