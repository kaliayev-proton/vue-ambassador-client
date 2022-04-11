import { defineStore } from 'pinia';
import { User } from 'src/models/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: new User(),
  }),
  getters: {
    getUser(): User {
      return this.user;
    },
  },
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
