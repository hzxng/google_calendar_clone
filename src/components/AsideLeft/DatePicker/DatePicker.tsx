import styles from './DatePicker.module.scss'
import { DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import 'react-day-picker/style.css'
import { css } from './DatePicker.style'
import { useState } from 'react'

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>()

  const handleDateClick = (date: Date | undefined) => {
    setSelectedDate(date)
  }

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
          selected={selectedDate}
        />
      </div>
    </div>
  )
}
