<template>
  <q-header elevated>
    <q-toolbar class="bg-green-8">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer()"
      />

      <q-toolbar-title> Ambassador</q-toolbar-title>

      <q-space />

      <div v-if="showHeader">
        <span> {{ description }}</span> <span> {{ title }}</span>
      </div>

      <div class="flex items-center q-pa-md q-gutter-sm">
        <router-link to="/profile" class="p-2 text-white text-decoration-none">
          {{ user?.first_name }} {{ user?.last_name }}
        </router-link>

        <router-link to="/rankings" v-if="user">
          <q-btn color="red" text-color="white" label="Rankings" />
        </router-link>
        <router-link to="/stats" v-if="user">
          <q-btn color="blue" text-color="white" label="Stats" />
        </router-link>
        <router-link to="/login" v-if="!user">
          <q-btn color="purple" text-color="white" label="Login" />
        </router-link>
        <q-btn
          v-if="user"
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
import { computed, ComputedRef, defineComponent, ref, watch } from 'vue';
import { useUserStore } from 'stores/user';
import { User } from 'src/models/user';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainHeader',

  methods: {
    toggleLeftDrawer() {
      this.$emit('toggleLeftDrawer');
    },
  },
  setup() {
    const title = ref('');
    const description = ref('');
    const UserStore = useUserStore();

    const user: ComputedRef<User> = computed(() => UserStore.getUser);

    title.value = user.value ? '$' + user.value.revenue : 'Welcome';
    description.value = user.value
      ? 'You have earned this far '
      : 'Share links to run money';

    watch(user, () => {
      title.value = user.value ? '$' + user.value.revenue : 'Welcome';
      description.value = user.value
        ? 'You have earned this far '
        : 'Share links to run money';
    });

    const route = useRoute();
    const showHeader = computed(
      () => route.path === '/' || route.path === '/backend'
    );

    const logout = async () => {
      await api.post('logout');

      UserStore.setUser(null);

      // this.$router.push('/login');
    };

    return { user, title, description, logout, showHeader };
  },
});
</script>
