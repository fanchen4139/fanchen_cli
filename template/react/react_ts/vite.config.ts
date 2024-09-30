import {defineConfig, loadEnv} from 'vite'
import type {ConfigEnv, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
  const root: string = process.cwd()
  const env: Record<string, string> = loadEnv(mode, root)
  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      // extensions: ['.ts', '.tsx'],
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://101.43.195.201/api",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, '')
          },
          // https is require secure=false
          ...(/^https:\/\//.test(env.VITE_API_URL) ? {secure: false} : {})
        }
      },
    }
  }
})
