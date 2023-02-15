import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'goods'
    }
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home/Index.vue'),
    meta: {
      title: '首页'
    }
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
