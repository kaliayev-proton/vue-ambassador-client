<template>
  <div class="q-pa-md" v-if="links">
    <q-banner inline-actions rounded class="bg-green text-white">{{
      links
    }}</q-banner>
  </div>
  <div class="q-pa-md" v-if="error">
    <q-banner inline-actions rounded class="bg-red text-white">{{
      error
    }}</q-banner>
  </div>
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
  <div class="q-pa-md" v-if="selected.length > 0">
    <q-btn
      color="green"
      text-color="white"
      label="Generate Link"
      @click="generateLink()"
    />
  </div>
  <div class="q-pa-md products-grid">
    <q-card
      flat
      bordered
      class="my-card bg-grey-1"
      v-for="product in products"
      :key="product.id"
      @click="select(product.id)"
      :class="selected.some((s) => s === product.id) ? 'card selected' : 'card'"
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
  <div class="q-pa-md" v-if="filter.page < lastPage">
    <q-btn color="blue" text-color="white" @click="loadMore">Load more</q-btn>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent, ref, SetupContext } from 'vue';

export default defineComponent({
  name: 'ProductList',
  props: ['products', 'filter', 'lastPage'],
  emits: ['set-filters'],
  setup(props: any, context: SetupContext) {
    const selected = ref<number[]>([]);
    const links = ref('');
    const error = ref('');
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

    const select = (id: number) => {
      if (selected.value.some((s) => s === id)) {
        selected.value = selected.value.filter((s) => s !== id);
        return;
      }
      selected.value = [...selected.value, id];
    };

    const generateLink = async () => {
      try {
        const { data } = await api.post('links', {
          products: selected.value,
        });

        links.value = `Link generated: ${process.env.VUE_APP_CHECKOUT_URL}/${data.code}`;
      } catch {
        error.value = 'You should be logged in to generate a link!';
      } finally {
        setTimeout(() => {
          links.value = '';
          error.value = '';
        }, 5000);
      }
    };

    return {
      search,
      sort,
      loadMore,
      select,
      selected,
      generateLink,
      links,
      error,
    };
  },
});
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1rem;
}

.card {
  cursor: pointer;
}
.card.selected {
  border: 4px solid darkcyan;
}
</style>
