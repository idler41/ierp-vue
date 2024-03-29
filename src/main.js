import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission'
import _ from 'lodash' // permission control

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

// vue 使用第三方库
Object.defineProperty(Vue.prototype, '$_', { value: _ })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
