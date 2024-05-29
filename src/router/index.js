import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      meta: {
        layout: 'default'
      },
      component: () => import('../views/TodoView.vue'),
      props: { statusFilter: 0 }
    },
    {
      path: '/inprogress',
      name: 'inprogress',
      meta: {
        layout: 'default'
      },
      component: () => import('../views/InProgressView.vue'),
      props: { statusFilter: 1 }
    },
    {
      path: '/completed',
      name: 'completed',
      meta: {
        layout: 'default'
      },
      component: () => import('../views/CompletedView.vue'),
      props: { statusFilter: 2 }
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active-class'
})

export default router
