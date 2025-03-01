import { useState } from 'react'
import styles from './UserSearch.module.scss'
import { ReactComponent as PeopleIcon } from '@assets/images/people.svg'

export default function UserSearch() {
  const [isFocus, setIsFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')

  return (
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
  )
}
