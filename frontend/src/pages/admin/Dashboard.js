import { Route, Routes } from "react-router-dom"
import DashboredLayout from "./DashboredLayout"
import Forms from "./Forms"
import Houses from "./Houses"
import Reports from "./Reports"
import Users from "./Users"
import Overveiw from "./Overveiw"

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboredLayout />}>
        <Route index path="overveiw" element={<Overveiw />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:pageNumber" element={<Users />} />
        <Route path="houses" element={<Houses />} />
        <Route path="reports" element={<Reports />} />
        <Route path="forms" element={<Forms />} />
      </Route>
    </Routes>
  )
}
export default Dashboard
