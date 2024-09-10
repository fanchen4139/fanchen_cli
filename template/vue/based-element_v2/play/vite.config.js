import {defineConfig} from "vite";
import {createVuePlugin} from "vite-plugin-vue2";

export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
  resolve: {
    alias: {
      '@': '/src', // 将 @ 映射到项目的根目录下的 src 文件夹
    }
  },
  server: {
    port: 10022,
    hmr: {
      overlay: false
    }
  }
})
