import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  getAuthButtonListApi,
  getAuthMenuListApi,
  getAuthRoleListApi
} from '@/api/modules/system/login'
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from '@/utils'
import type {ItemType} from "antd/es/menu/interface"

// 定义状态类型
interface AuthState {
  isLoaded: boolean
  authButtonList: string[]
  authMenuList: ItemType[]
  authRoleList: string[]
  routeName: string
}

// 异步方法 - 获取按钮权限列表
export const getAuthButtonList = createAsyncThunk('auth/getAuthButtonList', async () => {
  const response = await getAuthButtonListApi()
  return response.data
})

// 异步方法 - 获取菜单权限列表
export const getAuthMenuList = createAsyncThunk('auth/getAuthMenuList', async () => {
  const response = await getAuthMenuListApi()
  return response.data
})

// 异步方法 - 获取用户角色列表
export const getAuthRoleList = createAsyncThunk('auth/getAuthRoleList', async () => {
  const response = await getAuthRoleListApi()
  return response.data
})

// 创建 Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoaded: false,
    authButtonList: [],
    authMenuList: [],
    authRoleList: [],
    routeName: '',
  } as AuthState,
  reducers: {
    // 同步设置 routeName
    setRouteName: (state, action: PayloadAction<string>) => {
      state.routeName = action.payload
    },
    // 设置 isLoaded
    setLoaded: (state) => {
      state.isLoaded = true
    },
    // 清除状态
    clear: (state) => {
      state.isLoaded = false
      state.authButtonList = []
      state.authMenuList = []
      state.authRoleList = []
      state.routeName = ''
    },
  },
  // 处理异步方法
  extraReducers: (builder) => {
    // 按钮权限列表
    builder.addCase(getAuthButtonList.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.authButtonList = action.payload
    })
    // 菜单权限列表
    builder.addCase(getAuthMenuList.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
      // eslint-disable-next-line
      // @ts-ignore
      state.authMenuList = action.payload
    })
    // 用户角色列表
    builder.addCase(getAuthRoleList.fulfilled, (state, action: PayloadAction<string[]>) => {
      state.authRoleList = action.payload
    })
  },
})

// 导出同步 actions
const { setRouteName, setLoaded, clear } = authSlice.actions
export { setRouteName, setLoaded, clear }
const authReducer = authSlice.reducer
export default authReducer

// 辅助选择器函数，用于从状态中派生数据
export const selectAuthButtonList = (state: { auth: AuthState }) => state.auth.authButtonList
export const selectAuthMenuList = (state: { auth: AuthState }) => state.auth.authMenuList
export const selectAuthRoleList = (state: { auth: AuthState }) => state.auth.authRoleList
export const selectShowMenuList = (state: { auth: AuthState }) => getShowMenuList(state.auth.authMenuList)
export const selectFlatMenuList = (state: { auth: AuthState }) => getFlatMenuList(state.auth.authMenuList)
export const selectBreadcrumbList = (state: { auth: AuthState }) => getAllBreadcrumbList(state.auth.authMenuList)
