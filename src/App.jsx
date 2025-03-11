import "./App.css"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Header from "./components/Header"
import Spinner from "./components/Spinner"
import TaskBoard from "./components/TaskBoard"

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Spinner />
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100">
        <Header />
        <TaskBoard />
      </div>
    </DndProvider>
  )
}

export default App
