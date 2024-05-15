import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const AdminRouter = () => {
  const user = useSelector((state) => state.auth.user)

  return user && (user.role === "admin" || user.role === "super") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default AdminRouter
