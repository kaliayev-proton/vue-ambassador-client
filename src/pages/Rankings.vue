<template>
  <div class="q-pa-md">
    <h3>Rankings</h3>
    <q-table :rows="rankings" :columns="columns" row-key="id">
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
import { Rank, Ranking } from 'src/models/ranking';
import { defineComponent, onMounted, ref } from 'vue';

const columns = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
    format: (id: number) => id + 1,
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'revenue',
    label: 'Revenue',
    align: 'left',
    field: 'revenue',
  },
];

export default defineComponent({
  name: 'RankingsPage',
  setup() {
    const rankings = ref<Rank[]>([]);
    onMounted(async () => {
      const { data } = await api.get<Ranking>('rankings');

      const rankingParsed: Rank[] = Object.keys(data).map(
        (k: string, index: number) => ({
          name: k,
          revenue: data[k],
          id: index,
        })
      );
      rankings.value = rankingParsed;
    });
    return {
      columns,
      rankings,
    };
  },
});
</script>
