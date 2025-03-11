import React, { useContext } from "react"
import PropTypes from "prop-types"

import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import TaskContext from "../../contexts/TaskContext"
import { useDispatch } from "react-redux"
import { updateTask } from "../../services/dataService"
import StageContext from "../../contexts/StageContext"
import InputForm from "../InputForm"

const TaskDetailHeader = () => {
  const dispatch = useDispatch()

  const { task, onClose } = useContext(TaskContext)
  const { stage } = useContext(StageContext)

  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)

  const handleTitleSubmit = () => {
    if (task.title === newTitle) return

    dispatch(updateTask({ stageId: stage.id, taskId: task.id, payload: { title: newTitle } }))
    setIsEditing(false)
  }

  return (
    <div className="mb-4 flex items-center justify-start space-x-2">
      {isEditing ? (
        <InputForm
          autoFocus={true}
          onSubmit={e => handleTitleSubmit(e)}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={() => {
            setIsEditing(false)
          }}
          value={newTitle}
        />
      ) : (
        <h2 className="flex items-center text-xl font-semibold">{task.title}</h2>
      )}
      <div className="flex items-center">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        )}
        <button
          onClick={e => {
            e.stopPropagation()
            onClose()
          }}
          className="text-gray-500 hover:text-gray-700"
        ></button>
      </div>
    </div>
  )
}

TaskDetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}

export default TaskDetailHeader
