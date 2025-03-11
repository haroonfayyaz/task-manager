import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showSpinner: false,
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowSpinner: (state, action) => (state.showSpinner = action.payload),
  },
})

export const { setShowSpinner } = settingsSlice.actions

export default settingsSlice.reducer
