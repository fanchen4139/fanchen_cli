// import { RouterOptions } from 'vue-router'
// export const routes:Array<RouterOptions> = [
//   //   {
//   //     path: '/custom',
//   //     component: () => import('@/pages/custom.vue')
//   //   },
//   //   {
//   //     path: '/dynamic/:id',
//   //     component: () => import('@/pages/dynamic/_id.vue')
//   //   }
//   {
//     path: '/',
//     name: 'index',
//     redirect: '/about',
//     component: () => import('@/pages/index.vue'),
//   },
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import('@/pages/about.vue'),
//   }
// ]
// export default {
//   routes
// }
import type { RouterConfig } from '@nuxt/schema'
export const routes:RouterConfig = (_routes) => [
  //   {
  //     path: '/custom',
  //     component: () => import('@/pages/custom.vue')
  //   },
  //   {
  //     path: '/dynamic/:id',
  //     component: () => import('@/pages/dynamic/_id.vue')
  //   }
  {
    path: '/',
    // name: 'index',
    redirect: '/about',
    // component: () => import('@/pages/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about.vue'),
  }
]
export default {
  routes
}
