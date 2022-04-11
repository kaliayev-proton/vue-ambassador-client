<template>
  <div class="q-pa-md">
    <h3>Account Information</h3>
    <form @submit.prevent="infoSubmit">
      <div class="q-gutter-md" style="max-width: 500px">
        <q-input v-model="user.first_name" label="First Name" />
        <q-input v-model="user.last_name" label="Last Name" />
        <q-input v-model="user.email" type="email" label="Email" />
      </div>
      <div class="q-pa-md" style="max-width: 500px">
        <q-btn color="blue" text-color="white" label="Save" type="submit" />
      </div>
    </form>
    <h3>Change Password</h3>
    <form @submit.prevent="passwordSubmit">
      <div class="q-gutter-md" style="max-width: 500px">
        <q-input v-model="password" type="password" label="Password" />
        <q-input v-model="password_confirm" label="Password Confirm" />
      </div>
      <div class="q-pa-md" style="max-width: 500px">
        <q-btn color="blue" text-color="white" label="Save" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { useUserStore } from 'src/stores/user';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfilePage',
  data() {
    return {
      password: '',
      password_confirm: '',
    };
  },
  methods: {
    async infoSubmit() {
      const { data } = await api.put('users/info', {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
      });

      const UserStore = useUserStore();
      UserStore.setUser(data);
    },
    async passwordSubmit() {
      await api.put('users/password', {
        password: this.password,
        password_confirm: this.password_confirm,
      });
    },
  },
  computed: {
    user() {
      const UserStore = useUserStore();
      return UserStore.getUser;
    },
  },
});
</script>
