import Vue from 'vue'
import Router from 'vue-router'
import { asyncRouteMap, constantRoutes } from './modules/all'
import Layout from '@/layout'

Vue.use(Router)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

const initRouter = (routeData) => {
  const routes = buildRoutes(routeData)
  router.addRoutes(routes)
}

const buildRoutes = (data) => {
  const result = []
  for (const item of data) {
    if (isRoot(item) && isExternal(item)) {
      result.push({
        path: '', rootRedirect: true, component: Layout, redirect: item.path,
        children: [{
          name: item.key,
          path: item.path,
          component: item.component
        }]
      })
      continue
    }

    const defaultRoute = getRouteOrBlank(item.key)
    const route = {
      name: item.key || defaultRoute.name,
      path: item.path || defaultRoute.path,
      component: defaultRoute.component
    }
    if (hasChildren(item)) {
      if (isRoot(item)) {
        // 根目录特殊处理设置为Layout
        route.component = Layout
      }
      route.redirect = getPathOfFirstChildren(item)
      route.children = buildRoutes(item.children)
    }
    result.push(route)
  }
  return result
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

let times = 0
const getRouteOrBlank = (key) => asyncRouteMap[key] || {
  path: 'blank' + times++,
  name: 'blank' + times,
  component: () => import('@/views/blank/index')
}

const hasChildren = (data) => data.children && data.children.length && data.children.length > 0

const isRoot = (data) => data.level === 1

const isExternal = (data) => !hasChildren(data)

const getPathOfFirstChildren = (data) => {
  if (!data) {
    return ''
  }
  if (hasChildren(data)) {
    return getPathOfFirstChildren(data.children[0])
  }
  return data.path
}

export { initRouter, resetRouter }
export default router
