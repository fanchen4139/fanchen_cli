import {defineConfig} from 'vite'
import path from "path"
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from "vite-plugin-babel"
import Components from "unplugin-vue-components/vite"
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers"
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        extensions: ['.ts', '.vue'],
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    plugins: [
        vue(),
        babel(),
        vueJsx(),
        // Components({
        //   // 配置组件自动导入
        //   resolvers: [
        //     AntDesignVueResolver({
        //       importStyle: false, // css in js
        //     }),
        //   ],
        // }),
    ],
    // esbuild: {
    //   jsxFactory: 'h',
    //   jsxFragment: 'Fragment',
    // },
})
