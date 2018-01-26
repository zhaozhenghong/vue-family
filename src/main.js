import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false  // 设置为 false 以阻止 vue 在启动时生成生产提示。

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  attempt: 1,
  error: require('@/common/error.png'),
  loading: require('@/common/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
