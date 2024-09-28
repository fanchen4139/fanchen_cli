import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    // extensions: ['.ts', '.tsx'],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [react()],
})
