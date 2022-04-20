<template>
  <div class="q-pa-md" style="max-width: 300px">
    <input outlined label="Outlined" @keyup="search($event.target.value)" />
  </div>
  <div class="q-pa-md" style="max-width: 300px">
    <select outlined label="Outlined" @change="sort($event.target.value)">
      <option value="">Select</option>
      <option value="asc">Price Ascending</option>
      <option value="desc">Price Descending</option>
    </select>
  </div>
  <div class="q-pa-md products-grid">
    <q-card
      flat
      bordered
      class="my-card bg-grey-1"
      v-for="product in products"
      :key="product.id"
    >
      <img :src="product.image" height="100" />
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ product.title }}</div>
            <div class="text-subtitle2">${{ product.price }}</div>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable>
                    <q-item-section>Remove Card</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Send Feedback</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Share</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ product.description }}
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-pa-md">
    <q-btn color="blue" text-color="white" @click="loadMore">Load more</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  name: 'ProductList',
  props: ['products', 'filter'],
  emits: ['set-filters'],
  setup(props: any, context: SetupContext) {
    const search = (s: string) => {
      context.emit('set-filters', { ...props.filter, s, page: 1 });
    };

    const sort = (sort: string) => {
      context.emit('set-filters', { ...props.filter, sort, page: 1 });
    };

    const loadMore = () => {
      context.emit('set-filters', {
        ...props.filter,
        page: props.filter.page + 1,
      });
    };

    return { search, sort, loadMore };
  },
});
</script>

<style>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
}
</style>
