import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { setStages } from "../store/taskManagerSlice"

const useTask = () => {
  const dispatch = useDispatch()
  const taskManager = useSelector(state => state.taskManager)

  const updateTaskLists = (task, sourceStageId, destStageId) => {
    if (sourceStageId && destStageId) {
      const updatedLists = _.cloneDeep(taskManager.stages)
      const indexToUpdate = _.findIndex(updatedLists, ["id", sourceStageId])
      updatedLists[indexToUpdate].tasks = updatedLists[indexToUpdate].tasks.filter(c => c.id !== task.id)
      updatedLists[_.findIndex(updatedLists, ["id", destStageId])].tasks.push(task)
      dispatch(setStages(updatedLists))
    }
  }

  return { updateTaskLists }
}

export default useTask
