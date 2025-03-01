import styles from './AsideLeft.module.scss'
import CalendarList from './CalendarList'
import DatePicker from './DatePicker'
import UserSearch from './UserSearch'

export default function AsideLeft() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonSection} />
      <div className={styles.contentWrapper}>
        <DatePicker />
        <UserSearch />
        <CalendarList />
        <div className={styles.termsContainer}>이용약관 – 개인정보처리방침</div>
      </div>
    </div>
  )
}
