import { faPlus } from "@fortawesome/free-solid-svg-icons"
import React, { useContext, useState } from "react"
import SpinnerContext from "../contexts/SpinnerContext"
import { RenderIf } from "../utils/common"
import ButtonWithIcon from "./ButtonWithIcon"
import InputForm from "./InputForm"

const TaskBoard = () => {
  const [showNewStageInput, setShowNewStageInput] = useState(false)
  const [newStageName, setNewStageName] = useState("")

  const setShowSpinner = useContext(SpinnerContext)

  const handleSubmit = async e => {
    e.preventDefault()
    setShowSpinner(true)
    setNewStageName("")
    setTimeout(() => {
      setShowSpinner(false)
    }, 3000)
    setShowNewStageInput(false)
  }

  return (
    <div className="flex h-full items-start justify-start overflow-x-auto overflow-y-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="flex space-x-4">
        <div className="h-fit min-w-[272px] rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-white/30">
          <div className="inline-flex w-full items-center justify-between">
            <h2 className="text-lg font-medium text-white">Add another stage</h2>
            <ButtonWithIcon
              color={"bg-white/10"}
              hoverColor={"bg-white/20"}
              title={"Create Stage"}
              onClick={() => setShowNewStageInput(true)}
              icon={faPlus}
            />
          </div>
          <RenderIf isTrue={showNewStageInput}>
            <InputForm
              onSubmit={e => handleSubmit(e)}
              placeholder="Enter list title..."
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
