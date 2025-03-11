import { faPlus } from "@fortawesome/free-solid-svg-icons"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useTask from "../hooks/useTask"
import { createList, getLists } from "../services/dataService"
import { RenderIf } from "../utils/common"
import ButtonWithIcon from "./ButtonWithIcon"
import InputForm from "./InputForm"
import Stage from "./Stage"

const TaskBoard = () => {
  const dispatch = useDispatch()
  const taskManager = useSelector(state => state.taskManager)
  const { updateTaskLists } = useTask()

  const [showNewStageInput, setShowNewStageInput] = useState(false)
  const [newStageName, setNewStageName] = useState("")

  useEffect(() => {
    dispatch(getLists())

    const handleStorageChange = event => {
      if (event.key === "stages") {
        dispatch(getLists())
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [dispatch])

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(createList(newStageName))
    setNewStageName("")
    setShowNewStageInput(false)
  }

  const handleDrop = async ({ task, dragStageId }, dropStageId) => updateTaskLists(task, dragStageId, dropStageId)

  return (
    <div className="flex h-full items-start justify-start overflow-x-auto bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="flex flex-wrap space-x-4 space-y-4 overflow-y-auto h-full">
        {taskManager.stages.map((stage, idx) => (
          <Stage key={`__stage__${idx}`} onDrop={handleDrop} stage={stage} />
        ))}
        <div className="h-fit min-w-[272px] rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30">
          <div className="inline-flex w-full items-center justify-between">
            <h2 className="text-lg font-medium text-white">Add another stage</h2>
            <ButtonWithIcon
              color={"bg-white/10"}
              hoverColor={"bg-white/20"}
              title="Create Stage"
              onClick={() => setShowNewStageInput(true)}
              icon={faPlus}
            />
          </div>
          <RenderIf isTrue={showNewStageInput}>
            <InputForm
              onSubmit={e => handleSubmit(e)}
              placeholder="Enter stage title..."
              onBlur={() => {
                setShowNewStageInput(false)
                setNewStageName("")
              }}
              onChange={e => setNewStageName(e.target.value)}
              value={newStageName}
              className="mt-2"
            />
          </RenderIf>
        </div>
      </div>
    </div>
  )
}

export default TaskBoard
