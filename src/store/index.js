import { configureStore } from "@reduxjs/toolkit"
import taskManagerReducer from "./taskManagerSlice"
import settingsReducer from "./settingsSlice"

const store = configureStore({
  reducer: {
    taskManager: taskManagerReducer,
    settings: settingsReducer
  },
})

export default store;
