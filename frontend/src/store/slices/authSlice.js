import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log("action.payload", action.payload)
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    logout: (state, actions) => {
      state.user = null
      localStorage.removeItem("user")
    },
  },
})
export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
