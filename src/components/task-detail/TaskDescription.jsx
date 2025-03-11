import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
import { useDispatch } from "react-redux"
import StageContext from "../../contexts/StageContext"
import TaskContext from "../../contexts/TaskContext"
import { updateTask } from "../../services/dataService"

const TaskDescription = () => {
  const dispatch = useDispatch()
  const { stage } = useContext(StageContext)
  const { task } = useContext(TaskContext)
  const [description, setDescription] = useState(task?.description)
  const [isEditing, setIsEditing] = useState(false)

  const updateDescription = async () => {
    dispatch(updateTask({ stageId: stage.id, taskId: task.id, payload: { description } }))
  }

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Description</h3>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => {
            setIsEditing(!isEditing)

            if (isEditing) updateDescription()
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      {isEditing ? (
        <textarea
          className="w-full rounded border p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
        />
      ) : (
        <p className="text-gray-700">{description || "No description available"}</p>
      )}
    </div>
  )
}

TaskDescription.propTypes = {
  task: PropTypes.object.isRequired,
}

export default TaskDescription
