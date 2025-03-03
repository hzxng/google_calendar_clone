import { modalDateFormat } from '@utils/formatter'
import SelectBar from '@components/SelectBar/SelectBar'
import styles from './TimeSelectionForm.module.scss'

interface TimeSelectionFormProps {
  date: string
  isCheckAllDay: boolean
  setIsCheckAllDay: (value: boolean) => void
  selectedStart: number
  selectedEnd: number
  setSelectedStart: React.Dispatch<React.SetStateAction<number>>
  setSelectedEnd: React.Dispatch<React.SetStateAction<number>>
  selectedRepeat: string
  setSelectedRepeat: React.Dispatch<React.SetStateAction<string>>
}

export default function TimeSelectionForm({
  date,
  isCheckAllDay,
  setIsCheckAllDay,
  selectedStart,
  selectedEnd,
  setSelectedStart,
  setSelectedEnd,
  selectedRepeat,
  setSelectedRepeat,
}: TimeSelectionFormProps) {
  return (
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
  )
}
