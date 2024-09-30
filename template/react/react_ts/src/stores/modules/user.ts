import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ILogin} from "../../api/interface/system/login.ts";
interface UserState {
  token: string,
  userInfo: ILogin.UserInfo
}

const userStore = createSlice({
  name: 'user',
  // 初始化状态数据
  initialState: {
    token: "",
    userInfo: {
      username: ''
    },
  } as UserState,
  // 修改数据的同步方法
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setUserInfo: (state, action: PayloadAction<ILogin.UserInfo>) => {
      state.userInfo = action.payload
    },
    clear: (state) => {
      state.token = ""
      state.userInfo = {
        username: ''
      }
    }
  }
})

// 解构出创建action对象的函数
export const { setToken, setUserInfo, clear } = userStore.actions

const userReducer = userStore.reducer
export default userReducer
