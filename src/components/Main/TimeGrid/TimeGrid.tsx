import { getWeek } from '@utils/getWeek'
import Schedule from '../Schedule/Schedule'
import styles from './TimeGrid.module.scss'
import { useState } from 'react'
import CreateModal from '@components/Modal/CreateModal'

export default function TimeGrid() {
  const [show, setShow] = useState(true)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  const week = getWeek(new Date())

  return (
    <div className={styles.timeGrid}>
      {week.map(({ fullDate }) => (
        <div className={styles.dayColumn} key={`grid-${fullDate}`}>
          {hours.map((h) => (
            <div className={styles.cell} key={`${fullDate}-${h}`} />
          ))}

          <Schedule date={fullDate} />
        </div>
      ))}
      {show && <CreateModal />}
    </div>
  )
}
