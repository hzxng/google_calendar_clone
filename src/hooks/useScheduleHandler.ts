import { useState } from 'react'

export function useScheduleHandler() {
  const [createModalShow, setCreateModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [fullDate, setFullDate] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [scheduleTitle, setScheduleTitle] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleInfo, setScheduleInfo] = useState<{
    title: string
    date: string
    startTime: number
    endTime: number
  } | null>(null)
  const [createModalPosition, setCreateModalPosition] = useState({
    top: 0,
    left: 0,
  })
  const [deleteModalPosition, setDeleteModalPosition] = useState({
    top: 0,
    left: 0,
  })

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    date: string,
    time?: number
  ) => {
    if (time) setStartTime(time)
    const rect = e.currentTarget.getBoundingClientRect()

    setCreateModalPosition({
      top: rect.top,
      left: rect.left,
    })
    setFullDate(date)
    setCreateModalShow(true)
  }

  const handleScheduleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    title: string,
    date: string,
    startTime?: number,
    endTime?: number
  ) => {
    e.stopPropagation()
    if (title && startTime && endTime)
      setScheduleInfo({ title, date, startTime, endTime })

    const rect = e.currentTarget.getBoundingClientRect()

    setDeleteModalPosition({
      top: rect.top,
      left: rect.left,
    })
    setScheduleTitle(title)
    setScheduleDate(date)
    setDeleteModalShow(true)
  }

  const handleClose = () => {
    setCreateModalShow(false)
    setDeleteModalShow(false)
  }

  return {
    createModalShow,
    deleteModalShow,
    fullDate,
    startTime,
    scheduleTitle,
    scheduleDate,
    scheduleInfo,
    createModalPosition,
    deleteModalPosition,
    handleClick,
    handleScheduleClick,
    handleClose,
  }
}
