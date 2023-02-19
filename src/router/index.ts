import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'Home',
    },
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home/Index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'Detail',
    path: '/detail',
    component: () => import('@/views/Detail/Index.vue'),
    meta: {
      title: '账号详情',
    },
  },
  {
    name: 'Search',
    path: '/search',
    component: () => import('@/views/Search/Index.vue'),
    meta: {
      title: '选号',
    },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
