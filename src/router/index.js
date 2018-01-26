import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/m-index'
import Service from '@/components/m-service'
import MInfo from '@/components/m-common/m-info'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/service',
      name: 'Service',
      component: Service,
      children: [
        {
          path: ':id',
          component: MInfo
        }
      ]
    }
  ]
})
