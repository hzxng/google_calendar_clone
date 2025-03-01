import { useState } from 'react'
import styles from './AsideLeft.module.scss'
import { ReactComponent as PeopleIcon } from '@assets/images/people.svg'
import { ReactComponent as PlusIcon } from '@assets/images/plus.svg'
import { DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import 'react-day-picker/style.css'

export default function AsideLeft() {
  const [isFocus, setIsFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>()

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

  const css = `
    .rdp-day {
      height: 26px;
      font-size: 10px;

      button {
        width: 24px;
        height: 24px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
    }

    .rdp-day.rdp-today {
      button {
        color: rgb(255, 255, 255) !important;
        background-color: rgb(11, 87, 208) !important;
        border-radius: 50%;
      }
    }

    .rdp-day.rdp-selected {
      button {
        background-color: rgb(194, 231, 255);
        border-radius: 50%;
        border: none;
        font-weight: 500;
      }
    }

    .rdp-outside {
      opacity: 1;
    }

    .rdp-outside.rdp-selected {
      button {
        background-color: rgb(221, 227, 234);
      }
    }

    .rdp-weekday {
      height: 26px;
      font-size: 10px;
    }

    .rdp-caption_label {
      font-size: 14px;
      font-weight: 500;
      padding-left: 9px;
    }

    .rdp-month_caption {
      height: 32px;
    }
    
    .rdp-nav {
      gap: 6px;
      width: 54px;
      height: 25px;
      margin-top: 1.5px;
      margin-right: 3px;
    
      button {
        width: 24px;
        height: 25px;
      }

      svg {
        width: 12px;
        height: 12px;
        fill: rgb(31, 31, 31);
      }
    }
  `

  const handleDateClick = (date: Date | undefined) => {
    setSelectedDate(date)
    console.log(date)
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonSection} />
      <div className={styles.contentWrapper}>
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
        <div className={styles.searchContainer}>
          <div className={styles.inputWrapper}>
            {!isFocus && !inputValue && (
              <div className={styles.placeholer}>
                <PeopleIcon width={20} height={20} />
                <div>사용자 검색</div>
              </div>
            )}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
            />
          </div>
        </div>
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
        <div className={styles.termsContainer}>이용약관 – 개인정보처리방침</div>
      </div>
    </div>
  )
}
