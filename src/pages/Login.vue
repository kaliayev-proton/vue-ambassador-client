<template>
  <q-page class="row items-center justify-evenly">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        label="Email *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      ></q-input>

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password *"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
          (val) =>
            val.length > 8 ||
            'Please type a password with minimum 8 characters',
        ]"
      ></q-input>

      <div>
        <q-btn label="Sign in" type="submit" color="primary"></q-btn>
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        ></q-btn>
        <q-btn
          label="Registry"
          color="primary"
          flat
          class="q-ml-sm"
          @click="$router.push('/register')"
        ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'LoginPage',

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const email = ref(null);
    const password = ref(null);
    return {
      email,
      password,
      async onSubmit() {
        await api.post('login', {
          email: email.value,
          password: password.value,
        });
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
        router.push('/');
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
});
</script>
