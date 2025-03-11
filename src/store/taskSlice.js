import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setValue } = taskSlice.actions

export default taskSlice.reducer
