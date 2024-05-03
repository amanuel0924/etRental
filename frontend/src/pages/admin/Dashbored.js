import { Route } from "react-router-dom"
import DashboredLayout from "./DashboredLayout"
import Forms from "./Forms"
import Houses from "./Houses"
import Reports from "./Reports"
import Users from "./Users"

export const Dashbored = () => {
  return (
    <Route path="/" element={<DashboredLayout />}>
      <Route path="/users" element={<Users />} />
      <Route path="/houses" element={<Houses />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/forms" element={<Forms />} />
    </Route>
  )
}
