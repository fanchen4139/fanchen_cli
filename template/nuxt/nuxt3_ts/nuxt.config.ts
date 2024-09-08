// https://nuxt.com/docs/api/configuration/nuxt-config
import routerOptions from './router/index'
import { resolve } from 'path'
export default defineNuxtConfig({
  // router: routerOptions,
  // router: {
  //   options: {
  //     routes: routerOptions
  //   }
  // },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, '.')
  }
})
