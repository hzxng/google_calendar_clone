import styles from './DatePicker.module.scss'
import { DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import 'react-day-picker/style.css'
import { css } from './DatePicker.style'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDate } from '@store/selectedDate'
import { RootState } from '@store/store'

export default function DatePicker() {
  const dispatch = useDispatch()
  const selectedDate = useSelector((state: RootState) => state.date.value)

  const [selected, setSelected] = useState<Date>()
  const [month, setMonth] = useState<Date>()

  const handleDateClick = (date: Date | undefined) => {
    setSelected(date)
    dispatch(selectDate(date))
  }

  useEffect(() => {
    setSelected(selectedDate)
    setMonth(selectedDate)
  }, [selectedDate])

  return (
    <div className={styles.datePicker}>
      <div className={styles.datePickerWrapper}>
        <style>{css}</style>
        <DayPicker
          locale={ko}
          showOutsideDays
          fixedWeeks
          components={{
            CaptionLabel: (props) => {
              const date = (props.children as string).split(' ')
              return (
                <span {...props}>
                  {date[1]}년 {date[0]}
                </span>
              )
            },
          }}
          mode="single"
          onSelect={handleDateClick}
          selected={selected}
          month={month}
          onMonthChange={setMonth}
        />
      </div>
    </div>
  )
}
