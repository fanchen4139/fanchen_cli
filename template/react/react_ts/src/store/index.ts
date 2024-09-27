import counterReducer from "./modules/counterStore.ts";
import authReducer from "./modules/authStore.ts";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用 localStorage
// 定义 RootState 类型
export type RootState = {
  counter: ReturnType<typeof counterReducer>;
  auth: ReturnType<typeof authReducer>;
};

// Redux Persist 配置
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  // 其他 reducer 可以在这里添加
});

// 创建持久化的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 创建根store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 如果需要，可以关闭可序列化检查
        ignoredActions: ['persist/PERSIST'], // 忽略 persist 动作的可序列化检查
        ignoredPaths: ['register'], // 例如忽略某些路径
      },
    }),
});

export const persistor = persistStore(store);

export default {
  store,
  persistor,
}