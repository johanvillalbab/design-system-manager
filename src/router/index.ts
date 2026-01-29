import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue'),
    meta: { title: 'Dashboard' }
  },
  {
    path: '/component/:id',
    name: 'component-detail',
    component: () => import('@/pages/ComponentDetailPage.vue'),
    meta: { title: 'Component Detail' }
  },
  {
    path: '/issues',
    name: 'issues',
    component: () => import('@/pages/IssuesPage.vue'),
    meta: { title: 'Issues' }
  },
  {
    path: '/contributions',
    name: 'contributions',
    component: () => import('@/pages/ContributionsPage.vue'),
    meta: { title: 'Contributions' }
  },
  {
    path: '/audit',
    name: 'audit',
    component: () => import('@/pages/AuditPage.vue'),
    meta: { title: 'Audit' }
  },
  {
    path: '/requests',
    name: 'requests',
    component: () => import('@/pages/RequestsPage.vue'),
    meta: { title: 'Component Requests' }
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import('@/pages/AnalyticsPage.vue'),
    meta: { title: 'Analytics' }
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/pages/DocsPage.vue'),
    meta: { title: 'Documentation' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || 'Design System'} | DS Manager`
  next()
})

export default router
