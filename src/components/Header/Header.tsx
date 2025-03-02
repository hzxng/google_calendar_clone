import { ReactComponent as MenuIcon } from '@assets/images/menu.svg'
import { ReactComponent as ChevronLeftIcon } from '@assets/images/chevron-left.svg'
import { ReactComponent as ChevronRightIcon } from '@assets/images/chevro-right.svg'
import { ReactComponent as QuestionMarkIcon } from '@assets/images/question-mark.svg'
import { ReactComponent as SettingIcon } from '@assets/images/setting.svg'
import { ReactComponent as CalendarIcon } from '@assets/images/calendar.svg'
import { ReactComponent as CheckIcon } from '@assets/images/check.svg'
import { ReactComponent as WholeMenuIcon } from '@assets/images/whole-menu.svg'
import styles from './Header.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@store/store'
import { getWeek } from '@utils/getWeek'
import { selectDate } from '@store/selectedDate'

export default function Header() {
  const dispatch = useDispatch()
  const selectedDate = useSelector((state: RootState) => state.date.value)
  const [toggleActive, setToggleActive] = useState('calendar')

  const calendarTitle = () => {
    const week = getWeek(selectedDate)
    const isMixedYearWeek = week.some(
      (w) => w.year !== selectedDate.getFullYear()
    )
    const mixedMonthWeek = week
      .filter((w) => w.month !== selectedDate.getMonth() + 1)
      .pop()

    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth() + 1

    if (isMixedYearWeek && mixedMonthWeek) {
      return mixedMonthWeek.year < selectedYear
        ? `${mixedMonthWeek.year}년 ${mixedMonthWeek.month}월 – ${selectedYear}년 ${selectedMonth}월`
        : `${selectedYear}년 ${selectedMonth}월 – ${mixedMonthWeek.year}년 ${mixedMonthWeek.month}월`
    } else if (!isMixedYearWeek && mixedMonthWeek) {
      return mixedMonthWeek.month < selectedMonth
        ? `${selectedYear}년 ${mixedMonthWeek.month}월 – ${selectedMonth}월`
        : `${selectedYear}년 ${selectedMonth}월 – ${mixedMonthWeek.month}월`
    } else {
      return `${selectedYear}년 ${selectedMonth}월`
    }
  }

  const handleClickMove = (type: string) => {
    let dateDiff

    if (type === 'prev') dateDiff = selectedDate.getDate() - 7
    else dateDiff = selectedDate.getDate() + 7

    const newDate = new Date(selectedDate.setDate(dateDiff))
    dispatch(selectDate(newDate))
  }

  const handleMoveToToday = () => {
    dispatch(selectDate(new Date()))
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <div className={styles.menuIconWrapper}>
          <MenuIcon width={24} height={24} />
        </div>
        <div className={styles.calendarLogo}>
          <img
            src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_1_2x.png"
            width={40}
            height={40}
            alt="logo"
          />
          <span>Calendar</span>
        </div>
      </div>

      <div className={styles.headerCenter}>
        <div className={styles.dateContainer}>
          <div className={styles.dateControl}>
            <button onClick={handleMoveToToday}>오늘</button>
            <button onClick={() => handleClickMove('prev')}>
              <ChevronLeftIcon width={24} height={24} />
            </button>
            <button onClick={() => handleClickMove('next')}>
              <ChevronRightIcon width={24} height={24} />
            </button>
          </div>
          <div className={styles.dateWrapper}>{calendarTitle()}</div>
        </div>
        <div className={styles.settingContainer}>
          <button>
            <i className="material-symbols-outlined">search</i>
          </button>
          <button className={styles.questionMarkIcon}>
            <QuestionMarkIcon />
          </button>
          <button className={styles.settingIcon}>
            <SettingIcon />
          </button>
          <div className={styles.selectButton}>
            <button>
              <span>주</span>
              <i className="material-symbols-outlined">arrow_drop_down</i>
            </button>
          </div>
          <div className={styles.toggleButton}>
            <button
              className={cn({ [styles.active]: toggleActive === 'calendar' })}
              onClick={() => setToggleActive('calendar')}
            >
              <CalendarIcon width={20} height={20} fill="rgb(68, 71, 70)" />
            </button>
            <button
              className={cn({ [styles.active]: toggleActive === 'todo' })}
              onClick={() => setToggleActive('todo')}
            >
              <CheckIcon width={20} height={20} fill="rgb(68, 71, 70)" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.headerRight}>
        <button>
          <WholeMenuIcon width={24} height={24} />
        </button>
        <div className={styles.profileImg}>
          <div>
            <img
              src="https://lh3.googleusercontent.com/fife/ALs6j_GK0ZJu1jHxFw8Nwiaae1cuAATIA-MD-hh9ZVL3O5_Jd1iAtmJYEWEIE_AHhffgVvLtLEQDm5q6v1q3sHiIu7rajIy0KFWdpvrEISAdkc9DQmkcTW7Ql5WyLdJFMpx66BaIKJX_my7_7_ebGw49I1TSZn2lZVO53Bdj9HFocGfkyRCxq921Py1D2JGn-Wjxk0SmAPlpfMHakQSOOFAjygnaBcYoAEEq7XY2Nwa-ymwX8fxp9AACaeLDC6PudunNejtTY8XXvjOh_dwN99lvo3G7bmxDLvhNeHuxSvlpyufonwkbAatbxzH7NSAEWptLw21WmlrUOwXsdoOb5red8V25mvPSEZF01DlZYbGQwJytusKE4gYK8RIhdG7EsOJfXYPRXjKRfHD_XzRVXV8NKibxTW2yeW197xPwmagyT6-PtTHM5U1Sql677ImMT1eb62j7DgfoMXGuNxz0QayP6_WITw9gSYV18XAThBzXJCDDxJFsRD1mzcfHKkfhvV06FHkHCLgvSFrC1ifA6gdEHdz7sekXyVsGuBR6bsQXjB2emt2zgLCBrR_IR-G9qCqOlqmgFjdStcRQCIt-vpEm001uunj2Dj3tZyOsHU_0Eaj2cL64TS5BTHhQQgSsmaDd5R6UDtHA04ZviZxJ22KVqKftS5SNb78TzBN5MeF0A146-iKMotdANF4Vj4P6fGGUpSiMZrArJyIN9O0Kgron1Ad8OV1QcSRI2P6k4N03dH4HIf5OmDNhlABxQ6eREViEVdWkIeaw8STncroTzuoBuMe1hvKHaUg1Y8Yn8td4EY46dQROxWO5E1drEeLBqRA4juXcwir9fETxfzg8KH54pt0dM4Yd6vveef62v3gpIePU9Kj9YBeWdZPXcFlgjE6Ns8zKO_LvYrvEAFLo72MZ7P9Fn3_4d72_CQ8_a8DuRwE4PjgUh2JGK0_sMLohmoqeo4Ic8nPpt8rhhI6Cc8t1cLHmhpvoHuQmCFUDTyotL2KHJZBYpGPs0lLQ-7oq_HwAVyuhlTzyT5bIye8v7xszWsIBekFH-ftSirOHMGpYWrV5ZhOHalo8NbHpjH6cFkm1yCqtG9Z__IwP7n01w6RWeqShpdQJ85MYYzrwiyJib9miaYNZpRw4YA5M4Q-R6EVBlAAnOF8EAPN-SUhLijV0_Zkje-evg0tt_mD_cmiIul6nKgPbu1WbbAxCqkdjUM6VEDK8mwZs0IPMTKEXeUQCpp6jkxhFT85228bdqbickXJI4Rqm2Hm_MYKsiXgJ0YE4Z0oCseDlXwYfdwZUBZZ_9Vq6obdLOELgI8zLNVMYbkAOOjgL_gTVvy3svD1rTahtA2mpTrrN5hlIkdsYRksANVSGQ42d6N3XREiYPTSWjfpSLikb2_Yl9E3zDLScru5kPGu5HAsSCEqUfZja_cMj7qLSNjiek_wx74ZuauIPyDiQHglYRT7Dso0TZvZf1LbzVW5aRtXk_8kkckDCplFj0LO5zc8ewbDb62gZGPCnCA=s32-c"
              width={32}
              height={32}
              alt="profile-img"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
