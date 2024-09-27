<template>
  <a-button
      type="primary" v-if="!user.isLogin"
      class="user-profile-component"
      @click="login"
  >
    登录
  </a-button>
  <div v-else>
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ user.userName }}</router-link>
      <template v-slot:overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {useRouter} from 'vue-router'
import {message} from 'ant-design-vue'
import {useUserStore} from '../store/user'

type UserProps = {
  isLogin: boolean,
  userName: any
}

defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true
  }
})
const userStore = useUserStore()
const router = useRouter()
const login = () => {
  userStore.login()
  message.success('登录成功', 2)
}
const logout = () => {
  userStore.logout()
  message.success('退出登录成功，2秒后跳转到首页', 2)
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>
<style>
.user-profile-dropdown {
  border-radius: 2px !important;
}

.user-operation > * {
  margin-left: 30px !important;
}
</style>
