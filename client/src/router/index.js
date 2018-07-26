import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import SelectUser from '@/pages/SelectUser'
import HeaderSection from '@/components/HeaderSection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/SelectUser',
      name: 'SelectUser',
      component: SelectUser
    },
    {
      path: '/Header',
      name: 'HeaderSection',
      component: HeaderSection
    }
  ]
})
