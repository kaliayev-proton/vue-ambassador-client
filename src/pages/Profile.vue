<template>
  <div class="q-pa-md">
    <h3>Account Information</h3>
    <form @submit.prevent="infoSubmit">
      <div class="q-gutter-md" style="max-width: 500px">
        <q-input v-model="infoData.first_name" label="First Name" />
        <q-input v-model="infoData.last_name" label="Last Name" />
        <q-input v-model="infoData.email" type="email" label="Email" />
      </div>
      <div class="q-pa-md" style="max-width: 500px">
        <q-btn color="blue" text-color="white" label="Save" type="submit" />
      </div>
    </form>
    <h3>Change Password</h3>
    <form @submit.prevent="passwordSubmit">
      <div class="q-gutter-md" style="max-width: 500px">
        <q-input
          v-model="passwordData.password"
          type="password"
          label="Password"
        />
        <q-input
          v-model="passwordData.password_confirm"
          label="Password Confirm"
        />
      </div>
      <div class="q-pa-md" style="max-width: 500px">
        <q-btn color="blue" text-color="white" label="Save" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { User } from 'src/models/user';
import { useUserStore } from 'src/stores/user';
import { computed, ComputedRef, defineComponent, reactive, watch } from 'vue';

export default defineComponent({
  name: 'ProfilePage',
  data() {
    return {
      password: '',
      password_confirm: '',
    };
  },
  // methods: {
  //   async infoSubmit() {
  //     const { data } = await api.put('users/info', {
  //       // first_name: this.user.first_name,
  //       // last_name: this.user.last_name,
  //       // email: this.user.email,
  //     });

  //     const UserStore = useUserStore();
  //     UserStore.setUser(data);
  //   },
  //   async passwordSubmit() {
  //     await api.put('users/password', {
  //       password: this.password,
  //       password_confirm: this.password_confirm,
  //     });
  //   },
  // },
  // computed: {
  //   user() {
  //     const UserStore = useUserStore();
  //     return UserStore.getUser;
  //   },
  // },

  setup() {
    const UserStore = useUserStore();
    const user: ComputedRef<User> = computed(() => UserStore.getUser);
    const infoData = reactive({
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email,
    });
    const passwordData = reactive({
      password: '',
      password_confirm: '',
    });

    watch(user, () => {
      infoData.first_name = user.value.first_name;
      infoData.last_name = user.value.last_name;
      infoData.email = user.value.email;
    });

    const infoSubmit = async () => {
      const { data } = await api.put('users/info', infoData);

      const UserStore = useUserStore();
      UserStore.setUser(data);
    };
    const passwordSubmit = async () => {
      await api.put('users/password', passwordData);
    };

    return {
      infoData,
      passwordData,
      infoSubmit,
      passwordSubmit,
    };
  },
});
</script>
