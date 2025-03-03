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
import { selectDate } from '@store/selectedDate'
import profileImg from '../../assets/images/profile-img.png'
import { calendarTitle } from './utils/calendarTitle'

export default function Header() {
  const dispatch = useDispatch()
  const selectedDate = useSelector((state: RootState) => state.date.value)
  const [toggleActive, setToggleActive] = useState('calendar')

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
          <div className={styles.dateWrapper}>
            {calendarTitle(selectedDate)}
          </div>
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
            <img src={profileImg} width={32} height={32} alt="profile-img" />
          </div>
        </div>
      </div>
    </header>
  )
}
