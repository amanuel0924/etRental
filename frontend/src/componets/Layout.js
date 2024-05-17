import Header from "./Header.js"
import Footer from "./Footer.js"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Header />
      <main className=" ">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Layout
