<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer()"
      />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div class="flex items-center q-pa-md q-gutter-sm">
        <router-link to="/profile" class="p-2 text-white text-decoration-none">
          {{ user?.first_name }} {{ user?.last_name }}
        </router-link>

        <router-link to="/login">
          <q-btn color="purple" text-color="white" label="Login" />
        </router-link>
        <router-link to="/register">
          <q-btn color="amber" text-color="black" label="Register" />
        </router-link>
        <q-btn
          color="purple"
          text-color="white"
          label="Log out"
          @click="logout()"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'MainHeader',

  methods: {
    toggleLeftDrawer() {
      this.$emit('toggleLeftDrawer');
    },
    logout() {
      this.$emit('logout');
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
