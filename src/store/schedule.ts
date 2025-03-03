import { createSlice } from '@reduxjs/toolkit'

interface ScheduleType {
  value: {
    allDaySchedules: Record<string, string[]>
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
    deleteSchedule: (state, action) => {
      const { date, schedule } = action.payload

      if (!state.value.schedules[date]) return

      state.value.schedules[date] = state.value.schedules[date].filter(
        (s) =>
          s.title !== schedule.title ||
          s.start !== schedule.startTime ||
          s.end !== schedule.endTime
      )

      if (state.value.schedules[date].length === 0) {
        delete state.value.schedules[date]
      }
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

export const { createSchedule, deleteSchedule, createAllDaySchedule } =
  scheduleSlice.actions
export default scheduleSlice.reducer
