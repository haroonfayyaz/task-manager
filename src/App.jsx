import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import Spinner from "./components/Spinner"
import TaskBoard from "./components/TaskBoard"
import SpinnerContext from "./contexts/SpinnerContext"

function App() {
  const [showSpinner, setShowSpinner] = useState(false)
  return (
    <>
      <Header />
      <Spinner visible={showSpinner} />
      <SpinnerContext.Provider value={setShowSpinner}>
        <TaskBoard />
      </SpinnerContext.Provider>
    </>
  )
}

export default App
