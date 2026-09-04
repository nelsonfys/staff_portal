/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Index,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/dashboard.vue'),
    },
    {
      path: '/staffstatus',
      name: 'StaffStatus',
      component: () => import('@/pages/staffstatus.vue'),
    },
    {
      path: '/staffleave',
      name: 'StaffLeave',
      component: () => import('@/pages/staffleave.vue'),
    },
    {
      path: '/staffclaim',
      name: 'StaffClaim',
      component: () => import('@/pages/staffclaim.vue'),
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: () => import('@/pages/changepassword.vue'),
    },
  ],
})

export default router
