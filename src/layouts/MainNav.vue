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
    title: 'Frontend',
    caption: 'quasar.dev',
    icon: 'school',
    link: '/',
  },
  {
    title: 'Backend',
    caption: 'Backend component',
    icon: 'record_voice_over',
    link: '/backend',
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
