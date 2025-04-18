import React from "react"
import { Vortex } from "react-loader-spinner"
import { useSelector } from "react-redux"

const Spinner = () => {
  const visible = useSelector(state => state.settings.showSpinner)
  if (!visible) return

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  )
}

export default Spinner
