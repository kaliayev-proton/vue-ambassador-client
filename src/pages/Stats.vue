<template>
  <div class="q-pa-md">
    <h3>Stats</h3>
    <q-table title="Products" :rows="links" :columns="columns" row-key="id">
      <template v-slot:body-cell-img="props">
        <q-td key="bookmark" :props="props">
          {{ checkoutUrl(props.row.code) }}
          <!-- <router-link :to="`${props.row.code}`"></router-link> -->
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { Link } from 'src/models/link';
import { defineComponent, onMounted, ref } from 'vue';

const columns = [
  {
    name: 'link',
    label: 'Link',
    align: 'left',
    field: 'link',
  },
  {
    name: 'users',
    label: 'Users',
    align: 'left',
    field: 'users',
  },
  {
    name: 'revenue',
    label: 'Revenue',
    align: 'left',
    field: 'revenue',
  },
];

export default defineComponent({
  name: 'StatsPage',

  setup() {
    const links = ref<Link[]>([]);

    onMounted(async () => {
      const { data } = await api.get('stats');
      console.log(data);
      links.value = data;
    });

    const checkoutUrl = (code: string) =>
      `${process.env.VUE_APP_CHECKOUT_URL}/${code}`;

    return {
      links,
      columns,
      checkoutUrl,
    };
  },
});
</script>
