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
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
