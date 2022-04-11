<template>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="links" :columns="columns" row-key="name">
    </q-table>
  </div>
</template>
<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue';

const columns: any[] = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
  },
  {
    name: 'code',
    label: 'Code',
    align: 'left',
    field: 'code',
  },
  {
    name: 'count',
    label: 'Count',
    align: 'left',
    field: (row: any) => row?.orders?.length,
  },
  {
    name: 'revenue',
    label: 'Revenue',
    align: 'left',
    field: (row: any) =>
      row?.orders?.reduce((s: any, acc: any) => s + acc.total, 0),
  },
];

export default defineComponent({
  name: 'LinksPage',
  data() {
    return {
      links: [],
      columns,
    };
  },
  async mounted() {
    const { data } = await api.get(`users/${this.$route.params.id}/links`);

    this.links = data;
  },
});
</script>
