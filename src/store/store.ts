import { configureStore } from '@reduxjs/toolkit'
import dateSlice from './selectedDate'

export const store = configureStore({
  reducer: {
    date: dateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
