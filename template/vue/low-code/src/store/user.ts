import { defineStore } from 'pinia';

// export interface UserProps {
//   isLogin: boolean;
//   userName?: string;
// }

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: false,
    userName: undefined,
  }),
  actions: {
    login() {
      this.isLogin = true;
      this.userName = 'viking';
    },
    logout() {
      this.isLogin = false;
      this.userName = undefined;
    },
  },
});

export default useUserStore;
