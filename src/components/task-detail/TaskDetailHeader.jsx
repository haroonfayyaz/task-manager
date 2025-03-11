import React from "react"
import PropTypes from "prop-types"

const TaskDetailHeader = ({ title, onClose }) => (
  <div className="mb-4 flex items-start justify-between">
    <h2 className="flex items-center text-xl font-semibold">{title}</h2>
    <button
      onClick={e => {
        e.stopPropagation()
        onClose()
      }}
      className="text-gray-500 hover:text-gray-700"
    ></button>
  </div>
)

TaskDetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}

export default TaskDetailHeader
