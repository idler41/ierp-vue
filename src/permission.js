import router, { initRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = store.getters.token
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
    return
  }

  if (to.path === '/login') {
    // if is logged in, redirect to the home page
    next({ path: '/' })
    return
  }

  const hasGetUserInfo = store.getters.name
  if (hasGetUserInfo) {
    next()
    return
  }

  try {
    // get user info
    const { resources } = await store.dispatch('user/getInfo')
    initRouter(toRoute(resources))
    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  } catch (error) {
    // remove token and go to login page to re-login
    await store.dispatch('user/resetToken')
    Message.error(error || 'Has Error')
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

const toRoute = (data) => {
  // TODO
  return data
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
