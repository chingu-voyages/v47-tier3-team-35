import { Grid } from '@mui/material'
import { GreetingContainer } from './components/GreetingContainer'
import { Inventory } from './components/Inventory'
import { Expenses } from './components/Expenses'
import { Usage } from './components/Usage'
import { TopItems } from './components/TopItems'

export const DashboardContent = () => {
  return (
    <Grid container rowSpacing={2} columnSpacing={1}>
      <Grid item xs={12} sm={6} md={8}></Grid>
      <Grid item xs={12} sm={6} md={4}></Grid>
    </Grid>
  )
}
export default async function Dashboard() {
  return (
    <div>
      <GreetingContainer />
      <Inventory />
      <Expenses />
      <Usage />
      <TopItems />
    </div>
  )
}
