import {createSlice} from "@reduxjs/toolkit";

const authStore = createSlice({
  name: 'auth',
  // 初始化状态数据
  initialState: {
    authorization: "",
    isAuthenticated: false,
  },
  // 修改数据的同步方法
  reducers: {
    setAuth: (state, action) => {
      state.authorization = action.payload
      state.isAuthenticated = true
    },
    clearAuth: (state) => {
      state.authorization = ""
      state.isAuthenticated = false
    }
  }
})
// 解构出创建action对象的函数
const { setAuth, clearAuth } = authStore.actions
// 获取reducer函数
const authReducer = authStore.reducer

export { setAuth, clearAuth }

export default authReducer
