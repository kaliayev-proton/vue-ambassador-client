import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', redirect: '/users' },
      // { path: '/users', component: () => import('pages/Users.vue') },
      // { path: '/users/:id/links', component: () => import('pages/Links.vue') },
      {
        path: '/',
        component: () => import('src/pages/products/Products.vue'),
      },
      {
        path: '/backend',
        component: () => import('src/pages/ProductsBackend.vue'),
      },
      {
        path: '/products/create',
        component: () => import('src/pages/products/ProductForm.vue'),
      },
      {
        path: '/products/:id/edit',
        component: () => import('src/pages/products/ProductForm.vue'),
      },
      {
        path: '/orders',
        component: () => import('src/pages/Orders.vue'),
      },
      {
        path: '/profile',
        component: () => import('src/pages/Profile.vue'),
      },
      {
        path: '/stats',
        component: () => import('src/pages/Stats.vue'),
      },
      {
        path: '/rankings',
        component: () => import('src/pages/Rankings.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
