import { timeformat } from '@utils/formatter'
import styles from './TimeColumn.module.scss'

export default function TimeColumn() {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className={styles.timeColumn}>
      {hours.map((hour) => (
        <div className={styles.hour} key={hour}>
          {hour !== 0 && <span>{timeformat(hour)}</span>}
        </div>
      ))}
    </div>
  )
}
