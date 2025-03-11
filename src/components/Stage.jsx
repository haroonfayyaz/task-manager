import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import _ from "lodash"
import React, { useState } from "react"
import { useDrop } from "react-dnd"
import { RenderIf } from "../utils/common"
import { ITEM_TYPES } from "../utils/constants"
import Task from "./Task"
import InputForm from "./InputForm"
import { useDispatch } from "react-redux"
import { addTask } from "../services/dataService"
import StageContext from "../contexts/StageContext"

export default function Stage({ onDrop, stage }) {
  const dispatch = useDispatch()
  const [showNewTaskInput, setShowNewTaskInput] = useState(false)
  const [newTaskText, setNewTaskText] = useState("")

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ITEM_TYPES.TASK,
      drop: item => onDrop(item, stage.id),
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    }),
    [onDrop, stage.id],
  )

  const handleSubmit = async e => {
    e.preventDefault()

    dispatch(addTask({ stageId: stage.id, name: newTaskText }))
    setNewTaskText("")
    setShowNewTaskInput(false)
  }

  return (
    <div ref={dropRef} className={`${isOver && "animate-pulse"}`}>
      <div className="flex h-fit w-[272px] flex-col rounded-xl bg-gray-100 p-3 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h2 className={`text-lg font-medium ${stage.textColor}`}>
            {`${_.startCase(stage.name)} (${_.size(stage.tasks)})`}
          </h2>
        </div>
        <div className="custom-scrollbar max-h-[calc(100vh-200px)] overflow-y-auto">
          <ul className="space-y-2">
            {_.get(stage, "tasks", []).map(task => (
              <StageContext.Provider value={{ stage }}>
                <Task key={task.id} task={task} />
              </StageContext.Provider>
            ))}
          </ul>
        </div>
        <RenderIf
          isTrue={showNewTaskInput}
          fallback={
            <button
              onClick={() => setShowNewTaskInput(true)}
              className="mt-2 flex w-full items-center rounded-lg p-2 text-gray-600 hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add a task
            </button>
          }
        >
          <InputForm
            onSubmit={e => handleSubmit(e)}
            placeholder="Enter task title..."
            onBlur={() => {
              setShowNewTaskInput(false)
              setNewTaskText("")
            }}
            onChange={e => setNewTaskText(e.target.value)}
            value={newTaskText}
          />
        </RenderIf>
      </div>
    </div>
  )
}
