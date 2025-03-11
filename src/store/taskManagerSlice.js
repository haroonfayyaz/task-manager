import { createSlice } from "@reduxjs/toolkit"
import { createAsyncReducer } from "./helpers"
import * as service from "../services/dataService"
import { storeStages } from "../utils/common"

const initialState = {
  stages: [],
  loading: false,
  error: "",
}

export const taskSlice = createSlice({
  name: "taskManager",
  initialState,
  reducers: {
    clearError: state => (state.error = undefined),
    apiError: (state, action) => {
      state.loading = false
      state.error = action.payload?.error
    },
    setStages: (state, action) => {
      state.stages = action.payload
      storeStages(state.stages)
    },
  },
  extraReducers: builder => {
    createAsyncReducer(builder, service.getLists, (state, action) => {
      state.stages = action.payload
    })
    createAsyncReducer(builder, service.createList, (state, action) => {
      state.stages = action.payload
    })
    createAsyncReducer(builder, service.addTask, (state, action) => {
      const { stageId, task } = action.payload

      const stage = state.stages.find(stage => stage.id === stageId)
      if (stage) stage.tasks.push(task)

      storeStages(state.stages)
    })
    createAsyncReducer(builder, service.deleteTask, (state, action) => {
      state.stages = action.payload
    })
  },
})

export const { setStages } = taskSlice.actions

export default taskSlice.reducer
