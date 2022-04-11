<template>
  <q-page class="row items-center justify-evenly">
    <h2>Please Register</h2>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="firstName"
        label="First name *"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your first name',
        ]"
      ></q-input>
      <q-input
        filled
        v-model="lastName"
        label="Last name *"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type your last name',
        ]"
      ></q-input>
      <q-input
        filled
        v-model="email"
        label="Email *"
        hint="Email"
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
      <q-input
        filled
        type="password"
        v-model="passwordConfirm"
        label="Confirm your password *"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Please confirm your password',
        ]"
      ></q-input>

      <q-toggle
        v-model="accept"
        label="I accept the license and terms"
      ></q-toggle>

      <div>
        <q-btn label="Register" type="submit" color="primary"></q-btn>
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        ></q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterPage',

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    const password = ref(null);
    const passwordConfirm = ref(null);
    const accept = ref(false);
    return {
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
      accept,
      async onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          await api.post('register', {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password.value,
            password_confirm: passwordConfirm.value,
          });
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
          router.push('/login');
        }
      },

      onReset() {
        firstName.value = null;
        lastName.value = null;
        email.value = null;
        password.value = null;
        passwordConfirm.value = null;
        accept.value = false;
      },
    };
  },
});
</script>
