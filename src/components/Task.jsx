import { faTrash } from "@fortawesome/free-solid-svg-icons"
import React, { useContext, useState } from "react"
import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import StageContext from "../contexts/StageContext"
import TaskContext from "../contexts/TaskContext"
import { deleteTask } from "../services/dataService"
import { ITEM_TYPES } from "../utils/constants"
import ButtonWithIcon from "./ButtonWithIcon"
import TaskDetail from "./task-detail/TaskDetail"

export default function Task({ task }) {
  const dispatch = useDispatch()
  const { stage } = useContext(StageContext)

  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ITEM_TYPES.TASK,
      item: { task, dragStageId: stage.id },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [task, stage.id],
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
      dispatch(deleteTask({ stageId: stage.id, taskId }))
      Swal.fire("Deleted!", "Your task has been deleted.", "success")
    }
  }

  const openCardDetail = () => {
    setIsDetailOpen(true)
  }

  const onClose = () => {
    setIsDetailOpen(false)
  }

  return (
    <div ref={dragRef} style={{ opacity }} onClick={() => openCardDetail(task.id)}>
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
      {isDetailOpen && (
        <TaskContext.Provider value={{ task, handleDelete, onClose }}>
          <TaskDetail />
        </TaskContext.Provider>
      )}
    </div>
  )
}
