import { LogType } from "@/prisma/mock/mockData"

interface FoodActivity {
  foodLogs: LogType[];
}

const FoodActivity = () => {
  return (
    <div>
      Activity
    </div>
  )
}

export default FoodActivity
