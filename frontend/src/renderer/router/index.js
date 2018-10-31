import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'images',
      component: require('@/views/images').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})