import React, { memo, useContext, useEffect, useRef } from "react"
import StageContext from "../../contexts/StageContext"
import TaskContext from "../../contexts/TaskContext"
import TaskDescription from "./TaskDescription"
import TaskDetailHeader from "./TaskDetailHeader"

const TaskDetailComponent = () => {
  const { stage } = useContext(StageContext)
  const { task, onClose } = useContext(TaskContext)
  const modalRef = useRef()

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div ref={modalRef} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="p-6">
          <TaskDetailHeader title={task.title} onClose={onClose} />
          <p className="mb-4 text-sm text-gray-500">
            in list <b>{stage.name || "Doing"}</b>
          </p>
          <TaskDescription />
        </div>
      </div>
    </div>
  )
}

const TaskDetail = memo(TaskDetailComponent)

export default TaskDetail
