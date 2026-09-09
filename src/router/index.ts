/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import i18n from '@/plugins/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/dashboard.vue'),
      meta: {
        requiresAuth: true,
        title: 'leftDrawerMenu.dashBoard',
      }
    },
    {
      path: '/staffstatus',
      name: 'StaffStatus',
      component: () => import('@/pages/staffstatus.vue'),
      meta: {
        title: 'leftDrawerMenu.status',
      }
    },
    {
      path: '/staffleave',
      name: 'StaffLeave',
      component: () => import('@/pages/staffleave.vue'),
      meta: {
        title: 'leftDrawerMenu.leave',
      }
    },
    {
      path: '/staffclaim',
      name: 'StaffClaim',
      component: () => import('@/pages/staffclaim.vue'),
      meta: {
        title: 'leftDrawerMenu.claim',
      }
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: () => import('@/pages/changepassword.vue'),
      meta: {
        title: 'leftDrawerMenu.password',
      }
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'Login' }
  }

  if (to.name === 'Login' && authStore.isLoggedIn) {
    return { name: 'Dashboard' }
  }

  return true
})

router.afterEach((to) => {
  const titleKey = to.meta.title as string

  document.title = titleKey
    ? `${i18n.global.t(titleKey)}`
    : i18n.global.t('app.title')
})

export default router
