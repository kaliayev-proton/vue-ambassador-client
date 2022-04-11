<template>
  <q-list>
    <q-item-label header> Essential Links </q-item-label>

    <EssentialLink
      v-for="link in essentialLinks"
      :key="link.title"
      v-bind="link"
    />
  </q-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Users',
    caption: 'quasar.dev',
    icon: 'school',
    link: '/users',
  },
  {
    title: 'Products',
    caption: 'quasar.dev',
    icon: 'record_voice_over',
    link: '/products',
  },
  {
    title: 'Orders',
    caption: 'quasar.dev',
    icon: 'public',
    link: '/orders',
  },
  {
    title: 'Profile',
    caption: 'quasar.dev',
    icon: 'chat',
    link: '/profile',
  },
];
export default defineComponent({
  name: 'MainNav',

  components: {
    EssentialLink,
  },

  setup() {
    return {
      essentialLinks: linksList,
    };
  },
});
</script>
