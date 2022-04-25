<template>
  <ProductList
    :products="products"
    :filter="filter"
    @set-filters="load"
    :lastPage="lastPage"
  />
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import ProductList from './Products.vue';

export default defineComponent({
  name: 'ProductsBackend',
  components: { ProductList },
  setup() {
    const products = ref<Product[]>([]);
    const filter = reactive<Filter>({
      s: '',
      sort: '',
      page: 1,
    });
    const lastPage = ref(0);
    const load = async (f: Filter) => {
      filter.s = f.s;
      filter.sort = f.sort;
      filter.page = f.page;
      const arr = [];
      if (filter.s) {
        arr.push(`s=${filter.s}`);
      }
      if (filter.sort) {
        arr.push(`sort=${filter.sort}`);
      }
      if (filter.page) {
        arr.push(`page=${filter.page}`);
      }
      const { data } = await api.get(`products/backend?${arr.join('&')}`);

      products.value =
        filter.page === 1 ? data.data : [...products.value, ...data.data];
      lastPage.value = data.last_page;
    };
    onMounted(() => {
      load(filter);
    });
    return {
      products,
      filter,
      load,
      lastPage,
    };
  },
});
</script>
