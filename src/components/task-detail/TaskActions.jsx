import React, { useContext } from "react"
import TaskContext from "../../contexts/TaskContext"

const CardActions = () => {
  const { task, handleDelete } = useContext(TaskContext)

  const menuActions = [{ label: "Delete", onClick: () => handleDelete(task.id) }]
  return (
    <div className="bg-gray-50 p-6">
      {menuActions.map(({ label, onClick }) => (
        <button
          key={label}
          className={`w-full rounded p-2 text-left ${
            label === "Delete" ? "text-red-500 hover:bg-red-100" : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={onClick}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default CardActions
