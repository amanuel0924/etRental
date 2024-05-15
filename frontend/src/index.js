import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Provider } from "react-redux"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import "./index.css"
import store from "./store/store"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ForgotePassword from "./pages/ForgotePassword"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/admin/Dashboard"
import Layout from "./componets/Layout"
import HouseList from "./pages/HouseList"
import HouseDetail from "./pages/admin/HouseDetail"
import Profile from "./pages/Profile"
import PendingDetail from "./pages/PendingDetail"
import MyPending from "./pages/MyPending"
import RentedHouse from "./pages/RentedHouse"
import Nomach from "./componets/Nomach"
import PrivateRouter from "./componets/PrivateRouter"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/forgotPassword" element={<ForgotePassword />} />
        <Route path="/houses" element={<HouseList />} />
        <Route path="/houses/:pageNumber" element={<HouseList />} />
        <Route path="/houses/detail/:id" element={<HouseDetail />} />
        <Route path="" element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/pending" element={<MyPending />} />
          <Route path="/pending/:id" element={<PendingDetail />} />
          <Route path="/rentedHouse" element={<RentedHouse />} />
        </Route>
      </Route>
      <Route path="" element={<PrivateRouter />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Nomach />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
