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
  console.log("stages: ", stages)
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

  const task = _.find(stage.tasks, ["id", taskId])
  if (!task) return

  _.assign(task, payload)

  storeStages(stages)
  return stages
})

export const deleteTask = createAsyncThunk("delete_task", ({ stageId, taskId }) => {
  const stages = loadStages() || []

  const stage = _.find(stages, ["id", stageId])
  if (stage) stage.tasks = _.filter(stage.tasks, task => task.id !== taskId)

  storeStages(stages)
  return stages
})
