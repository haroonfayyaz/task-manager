export const RenderIf = ({ isTrue, children, fallback }) => {
  return isTrue ? children : fallback || null
}

export const sleep = (secs = 1) => new Promise(resolve => setTimeout(resolve, secs * 1000))

export const loadStages = () => {
  const stages = localStorage.getItem("stages")
  if (!stages) return

  return JSON.parse(stages)
}
export const storeStages = stages => localStorage.setItem("stages", JSON.stringify(stages))

export const createStage = (id, name) => ({ id, name, tasks: [] })

export const generateRandomUuid = (len = 10) => {
  return Array.from({ length: len }, () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    return characters.charAt(Math.floor(Math.random() * characters.length))
  }).join("")
}

export const createTask = title => ({ id: generateRandomUuid(), title, description: "" })
