import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import Header from "./components/Header"
import Spinner from "./components/Spinner"
import { setValue } from "./store/taskSlice"

function App() {
  const task = useSelector(state => state.task)
  const dispatch = useDispatch()
  return (
    <>
      <Header />
      {/* <Spinner /> */}

      <h2>{task.value}</h2>
      <button onClick={() => dispatch(setValue(task.value + 1))}>Test</button>
    </>
  )
}

export default App
