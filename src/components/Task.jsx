import { faTrash } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { deleteTask } from "../services/dataService"
import { ITEM_TYPES } from "../utils/constants"
import ButtonWithIcon from "./ButtonWithIcon"

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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      dispatch(deleteTask({ stageId, taskId }))
      Swal.fire("Deleted!", "Your task has been deleted.", "success")
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
              onClick={e => {
                e.stopPropagation()
                handleDelete(task.id)
              }}
            />
          </div>
        </div>
      </li>
    </div>
  )
}
