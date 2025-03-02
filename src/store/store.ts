import { configureStore } from '@reduxjs/toolkit'
import dateSlice from './selectedDate'
import scheduleSlice from './schedule'

export const store = configureStore({
  reducer: {
    date: dateSlice,
    schedule: scheduleSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
