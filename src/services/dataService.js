import { createAsyncThunk } from "@reduxjs/toolkit"
import _ from "lodash"
import { createStage, createTask, loadStages, storeStages } from "../utils/common"
import { DEFAULT_STAGES } from "../utils/constants"

export const getLists = createAsyncThunk("get_lists", () => {
  const existingStages = loadStages()
  if (existingStages) return existingStages

  storeStages(DEFAULT_STAGES)
  return DEFAULT_STAGES
})

export const createList = createAsyncThunk("create_list", name => {
  const stages = loadStages() || []
  const newId = _.get(_.last(stages), "id", 0) + 1
  stages.push(createStage(newId, name))

  storeStages(stages)
  return stages
})

export const addTask = createAsyncThunk("add_task", ({ stageId, name }) => ({ stageId, task: createTask(name) }))

export const updateTask = createAsyncThunk("update_task", ({ stageId, taskId, payload }) => {
  const stages = loadStages() || []

  const stage = _.find(stages, ["id", stageId])
  if (!stage) return

  const idx = _.findIndex(stage.tasks, ["id", taskId])

  stage.tasks[idx] = { ...stage.tasks[idx], ...payload }
  storeStages(stages)
  return _.cloneDeep(stages)
})

export const deleteTask = createAsyncThunk("delete_task", ({ stageId, taskId }) => {
  const stages = loadStages() || []

  const stage = _.find(stages, ["id", stageId])
  if (stage) stage.tasks = _.filter(stage.tasks, task => task.id !== taskId)

  storeStages(stages)
  return stages
})
