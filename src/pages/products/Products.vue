<template>
  <div class="q-pa-md">
    <div class="q-pa-md q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <q-btn
            color="green"
            text-color="white"
            label="Add Product"
            @click="$router.push('/products/create')"
          />
        </q-card-section>
      </q-card>
    </div>
    <q-table
      title="Products"
      :rows="products"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-img="props">
        <q-td key="bookmark" :props="props">
          <q-img
            :src="props.row.image"
            loading="lazy"
            spinner-color="white"
            height="140px"
            style="max-width: 80px"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td key="bookmark" :props="props">
          <q-btn-group push>
            <q-btn
              color="red"
              text-color="black"
              label="Delete"
              @click="del(props.row.id)"
            />
            <q-btn
              color="blue"
              text-color="white"
              label="Edit"
              :href="`/products/${props.row.id}/edit`"
            />
          </q-btn-group>
        </q-td>
      </template>
    </q-table>
    <ProductList
      :products="filteredProducts"
      :filter="filter"
      @set-filters="filtersChanged"
    />
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { Filter } from 'src/models/filter';
import { Product } from 'src/models/product';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import ProductList from '../Products.vue';

const columns = [
  {
    name: 'id',
    label: '#',
    align: 'left',
    field: 'id',
  },
  {
    name: 'image',
    label: 'Image',
    align: 'left',
    field: 'image',
  },
  {
    name: 'title',
    label: 'Title',
    align: 'left',
    field: 'title',
  },
  {
    name: 'description',
    label: 'Description',
    align: 'left',
    field: 'description',
  },
  {
    name: 'price',
    label: 'Price',
    align: 'left',
    field: 'price',
  },
  {
    name: 'actions',
    label: 'Actions',
    align: 'left',
    field: '',
  },
];

export default defineComponent({
  name: 'ProductsPage',
  components: { ProductList },
  data() {
    return {
      products: [],
      columns,
    };
  },
  async mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const { data } = await api.get('products');
      this.products = data;
    },
    async del(id: number) {
      if (confirm('Are you sure?')) {
        await api.delete(`products/${id}`);
        this.fetchProducts();
      }
    },
  },

  setup() {
    const allProducts = ref<Product[]>([]);
    const filteredProducts = ref<Product[]>([]);
    const filter = reactive<Filter>({
      s: '',
      sort: '',
      page: 1,
    });
    onMounted(async () => {
      const { data } = await api.get('products/frontend');

      allProducts.value = data;
      filteredProducts.value = data;
    });

    const filtersChanged = (f: Filter) => {
      filter.s = f.s;
      filter.sort = f.sort;
      let products = allProducts.value.filter(
        (p) =>
          p.title.toLowerCase().indexOf(filter.s.toLowerCase()) >= 0 ||
          p.description.toLowerCase().indexOf(filter.s.toLowerCase()) >= 0
      );

      if (filter.sort === 'asc') {
        products.sort((a, b) => {
          const diff = a.price - b.price;
          if (diff === 0) {
            return 0;
          }

          const sign = Math.abs(diff) / diff;

          return filter.sort === 'asc' ? sign : -sign;
        });
      }

      filteredProducts.value = products;
    };
    return {
      filteredProducts,
      filter,
      filtersChanged,
    };
  },
});
</script>
