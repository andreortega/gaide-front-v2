// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Login.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/LoginView.vue'),
      },
    ],
  },
  {
    path: '/home/',
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/clientes/',
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'Clientes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ClientesView.vue'),
      },
    ],
  },
  {
    path: '/projetos/:id',
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'Projetos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/ProjetosView.vue'),
      },
    ],
  },
  {
    path: '/empreendimentos/:id',
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'Empreendimentos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/EmpreendimentosView.vue'),
      },
    ],
  },
  {
    path: '/licencas/:id', // ID do Empreendimento, por enquanto
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'Licencas',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/LicencasView.vue'),
      },
    ],
  },
  {
    path: '/condicionantes/:id', // ID da Licença
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'Condicionantes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/CondicionantesView.vue'),
      },
    ],
  },
  {
    path: '/atividadesdecondicionantes/:id', // ID da Condicionante
    component: () => import('@/layouts/Interno.vue'),
    children: [
      {
        path: '',
        name: 'AtividadesDeCondicionantes',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/AtividadesDeCondicionantesView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
