import React, { useEffect, useRef, useState } from 'react'
import styles from './SelectBar.module.scss'
import cn from 'classnames'
import { timeformat } from '@utils/formatter'
import useClickOutside from '@hooks/useClickOutside'

interface SelectBarProps<T> {
  selectType: string
  setOption: React.Dispatch<React.SetStateAction<T>>
  optionValue: T
  startTime?: number
  hasArrow?: boolean
}

export default function SelectBar<T extends string | number>({
  selectType,
  setOption,
  optionValue,
  startTime = 0,
  hasArrow,
}: SelectBarProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useClickOutside(() => setIsOpen(false))
  const optionsRef = useRef<HTMLUListElement>(null)
  const activeOptionRef = useRef<HTMLLIElement>(null)

  const timeList = Array.from({ length: 24 }, (_, i) => [
    i,
    i + 0.25,
    i + 0.5,
    i + 0.75,
  ]).flat()
  const index = timeList.indexOf(startTime)
  const options = selectType === 'time' ? timeList.splice(index) : []

  const handleOptionClick = (option: T) => {
    setOption(option)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && activeOptionRef.current && optionsRef.current) {
      const optionElement = activeOptionRef.current
      const listElement = optionsRef.current

      listElement.scrollTo({
        top: optionElement.offsetTop - listElement.offsetTop,
      })
    }
  }, [isOpen, optionValue])

  return (
    <div ref={wrapperRef} className={styles.selectWrapper}>
      <button className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
        {selectType === 'time'
          ? timeformat(optionValue as number, 'modal')
          : optionValue}
        {hasArrow && (
          <i className="material-symbols-outlined">arrow_drop_down</i>
        )}
      </button>
      <ul
        ref={optionsRef}
        className={cn(styles.selectOptions, { [styles.open]: isOpen })}
      >
        {options.map((option, index) => (
          <li
            ref={optionValue === option ? activeOptionRef : null}
            className={cn(styles.optionItem, {
              [styles.active]: optionValue === option,
            })}
            key={index}
            onClick={() => handleOptionClick(option as T)}
          >
            <span>{timeformat(option, 'modal')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
