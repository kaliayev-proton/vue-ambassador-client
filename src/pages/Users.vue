<template>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="users" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td key="bookmark" :props="props">
          <router-link :to="`/users/${props.row.id}/links`">
            <q-btn color="amber" text-color="black" label="View" />
          </router-link>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { api } from 'src/boot/axios';
import { User } from 'src/models/user';
import { defineComponent } from 'vue';

const columns = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: (row: User) => row.id,
    // format: (val) => `${val}`,
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: (row: User) => `${row.first_name} ${row.last_name}`,
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left',
  },
  {
    label: 'Actions',
    align: 'left',
    name: 'actions',
  },
];

export default defineComponent({
  name: 'UsersPage',
  data() {
    return {
      users: [],
      columns,
    };
  },
  async mounted() {
    const { data } = await api.get('ambassadors');
    this.users = data;
  },
  // setup() {},
});
</script>
