<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader @toggleLeftDrawer="toggleLeftDrawer" />

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <MainNav />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainNav from './MainNav.vue';
import MainHeader from './MainHeader.vue';
import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainNav,
    MainHeader,
  },

  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    // async logout() {
    //   await api.post('logout');

    //   this.$router.push('/login');
    // },
  },

  setup() {
    onMounted(async () => {
      const router = useRouter();
      const UserStore = useUserStore();
      try {
        const { data } = await api.get('user');

        UserStore.setUser(data);
      } catch {
        router.push('/login');
      }
    });
  },
});
</script>
