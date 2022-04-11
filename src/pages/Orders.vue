<template>
  <h2>Orders</h2>
  <div class="q-pa-md" style="max-width: 1000px">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="order in orders"
        :key="order?.id.toString()"
        expand-separator
        icon="perm_identity"
        :label="order?.name"
        :caption="order?.total.toString()"
      >
        <q-card>
          <q-card-section>
            <q-table
              title="Products"
              :rows="order.order_items"
              :columns="columns"
              :row-key="order.id.toString()"
            >
            </q-table>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue';

const columns = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
  },
  {
    name: 'order_title',
    label: 'Title',
    align: 'left',
    field: 'order_title',
  },
  {
    name: 'price',
    label: 'Price',
    align: 'left',
    field: 'price',
  },
  {
    name: 'quantity',
    label: 'Quantity',
    align: 'left',
    field: 'quantity',
  },
];

export default defineComponent({
  name: 'OrdersPage',
  data() {
    return {
      orders: [],
      columns,
    };
  },
  async mounted() {
    const { data } = await api.get('orders');

    this.orders = data;
  },
});
</script>
