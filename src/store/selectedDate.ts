import { createSlice } from '@reduxjs/toolkit'

interface DateType {
  value: Date
}

const initialState: DateType = { value: new Date() }

export const dateSlice = createSlice({
  name: 'selectedDate',
  initialState,
  reducers: {
    selectDate: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { selectDate } = dateSlice.actions
export default dateSlice.reducer
