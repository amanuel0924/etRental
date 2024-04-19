import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PrivateRouter = () => {
  const user = useSelector((state) => state.auth.userInfo)

  return <>{user ? <Outlet /> : <Navigate to="/login" replace />}</>
}

export default PrivateRouter
