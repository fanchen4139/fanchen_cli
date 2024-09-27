import {createSlice} from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: 'counter',
  // 初始化状态数据
  initialState: {
    count: 0,
  },
  // 修改数据的同步方法
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
})
// 解构出创建action对象的函数
const { increment, decrement } = counterStore.actions
// 获取reducer函数
const counterReducer = counterStore.reducer

export { increment, decrement }

export default counterReducer
