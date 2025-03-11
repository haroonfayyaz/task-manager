import { createStage } from "./common"

export const DEFAULT_STAGES = [createStage(1, "Pending"), createStage(2, "In Progress"), createStage(3, "Complete")]

export const ITEM_TYPES = {
  TASK: "task",
}
