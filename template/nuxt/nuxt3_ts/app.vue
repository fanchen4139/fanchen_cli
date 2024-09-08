<template>
  <!--  <div>-->
  <!--    <NuxtRouteAnnouncer />-->
  <!--    <NuxtWelcome />-->
  <!--  </div>-->

  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/">redirect_to_about</NuxtLink></li>
        <li><NuxtLink to="/welcome">welcome</NuxtLink></li>
        <li><NuxtLink to="/index2">index2</NuxtLink></li>
      </ul>
    </nav>
  </header>
  <NuxtLayout>
    <!--    此处默认方式:   如果需要自定义路由规则，请查看 nuxt.config.ts 文件
            左边的目录结构会生成右边对应的路由
            | pages/                     {
            ---| about.vue                 "routes": [
            ---| index.vue       ==》        {
            ---| posts/                        "path": "/about",
            -----| [id].vue                    "component": "pages/about.vue"
                                             },
                                             {
                                               "path": "/",
                                               "component": "pages/index.vue"
                                             },
                                             {
                                               "path": "/posts/:id",
                                               "component": "pages/posts/[id].vue"
                                             }
                                           ]
                                         }

            -->
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>