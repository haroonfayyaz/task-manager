import { faTrash } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { useDrag } from "react-dnd"
import { ITEM_TYPES } from "../utils/constants"
import ButtonWithIcon from "./ButtonWithIcon"
import { useDispatch } from "react-redux"
import { deleteTask } from "../services/dataService"

export default function Task({ task, stageId }) {
  const dispatch = useDispatch()

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPES.TASK,
      item: { task, dragStageId: stageId },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [task, stageId],
  )

  const handleDelete = async taskId => {
    const confirmed = window.confirm("Are you sure you want to delete this task?")
    if (confirmed) {
      dispatch(deleteTask({ stageId, taskId }))
    }
  }

  return (
    <div ref={dragRef} style={{ opacity }}>
      <li className="group relative rounded-lg bg-white p-3 shadow hover:bg-gray-50">
        <div className="flex flex-col space-y-2">
          <span className="text-sm text-gray-700">{task.title}</span>
          <div className="flex items-center justify-between">
            <ButtonWithIcon
              color={"bg-red-400 opacity-0 group-hover:opacity-100"}
              hoverColor={"bg-red-500"}
              title="Remove Task"
              icon={faTrash}
              onClick={() => handleDelete(task.id)}
            />
          </div>
        </div>
      </li>
    </div>
  )
}
