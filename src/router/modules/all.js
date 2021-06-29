import Layout from '@/layout'

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '',
    rootRedirect: true,
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  }
]

const asyncRouteMap = {
  user: {
    path: '/user',
    name: 'user',
    component: () => import('@/views/dashboard/index')
  },
  role: {
    path: '/role',
    name: 'role',
    component: () => import('@/views/dashboard/index')
  }
}

export { constantRoutes, asyncRouteMap }
