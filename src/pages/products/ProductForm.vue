<template>
  <div class="q-pa-md">
    <h2>Create Product</h2>
    <form @submit.prevent="submit">
      <div class="q-gutter-md" style="max-width: 500px">
        <q-input v-model="title" label="Title" />
        <q-input v-model="description" type="textarea" label="Description" />
        <q-input v-model="image" label="Image" />
        <q-input v-model="price" type="number" min="0" label="Price" />
      </div>
      <div class="q-pa-md" style="max-width: 500px">
        <q-btn
          color="blue"
          text-color="white"
          label="Save"
          type="submit"
          @click="$router.push('/products/create')"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { api } from 'src/boot/axios';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductForm',
  data() {
    return {
      title: '',
      description: '',
      image: '',
      price: '',
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      const { data } = await api.get(`products/${this.$route.params.id}`);
      this.title = data.title;
      this.description = data.description;
      this.image = data.image;
      this.price = data.price;
    }
  },
  methods: {
    async submit() {
      const data = {
        title: this.title,
        description: this.description,
        image: this.image,
        price: parseInt(this.price, 10),
      };
      if (this.$route.params.id) {
        await api.put(`/products/${this.$route.params.id}`, data);
      } else {
        await api.post('/products', data);
      }
      this.$router.push('/products');
    },
  },
});
</script>
