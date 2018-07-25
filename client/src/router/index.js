import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import Menu from '@/pages/Menu'
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
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/Header',
      name: 'HeaderSection',
      component: HeaderSection
    }
  ]
})
