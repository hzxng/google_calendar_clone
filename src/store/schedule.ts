import { createSlice } from '@reduxjs/toolkit'

interface ScheduleType {
  value: {
    allDaySchedules: Record<string, string[]> // 객체 사용
    schedules: Record<
      string,
      {
        title: string
        start: number
        end: number
      }[]
    >
  }
}

const initialState: ScheduleType = {
  value: {
    allDaySchedules: {},
    schedules: {},
  },
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    createSchedule: (state, action) => {
      const { date, newSchedule } = action.payload
      state.value.schedules[date] = [
        ...(state.value.schedules[date] || []),
        newSchedule,
      ]
    },
    createAllDaySchedule: (state, action) => {
      const { date, allDayEvent } = action.payload
      state.value.allDaySchedules[date] = [
        ...(state.value.allDaySchedules[date] || []),
        allDayEvent,
      ]
    },
  },
})

export const { createSchedule, createAllDaySchedule } = scheduleSlice.actions
export default scheduleSlice.reducer
