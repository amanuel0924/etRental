import { Route, Routes } from "react-router-dom"
import DashboredLayout from "./DashboredLayout"
import Forms from "./Forms"
import Houses from "./Houses"
import Reports from "./Reports"
import Users from "./Users"
import Overveiw from "./Overveiw"
import UpdateUser from "./UpdateUser"
import HouseForm from "./HouseForm"
import MyHouse from "./MyHouse"
import UpdateHouse from "./UpdateHouse"
import HouseDetail from "./HouseDetail"

const Dashboard = () => {
  return (
    <Routes>
      <Route element={<DashboredLayout />}>
        <Route index path="overveiw" element={<Overveiw />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:pageNumber" element={<Users />} />
        <Route path="users/update/:id" element={<UpdateUser />} />
        <Route path="houses" element={<Houses />} />
        <Route path="reports" element={<Reports />} />
        <Route path="forms" element={<Forms />} />
        <Route path="my-houses" element={<MyHouse />} />
        <Route path="pending-requests" element={<Forms />} />
        <Route path="house/forms" element={<HouseForm />} />
        <Route path="house/update/:id" element={<UpdateHouse />} />
        <Route path="house/:id" element={<HouseDetail />} />
      </Route>
    </Routes>
  )
}
export default Dashboard
