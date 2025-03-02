import styles from './Main.module.scss'
import Week from './Week/Week'
import TimeColumn from './TimeColumn/TimeColumn'
import TimeGrid from './TimeGrid/TimeGrid'

export default function Main() {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className={styles.container}>
      <Week />
      <div className={styles.main}>
        <TimeColumn />
        <div className={styles.timeGridWrapper}>
          <div className={styles.blank}>
            {hours.map((_, i) => (
              <div className={styles.hour} key={`hour-${i}`} />
            ))}
          </div>
          <TimeGrid />
        </div>
      </div>
    </div>
  )
}
