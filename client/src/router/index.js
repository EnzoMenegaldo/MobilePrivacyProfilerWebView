import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import SelectUser from '@/pages/SelectUser'
import Data1 from '@/pages/Data1'
import Data2 from '@/pages/Data2'
import BluetoothCharts from '@/pages/BluetoothCharts'
import BatteryCharts from '@/pages/BatteryCharts'
import CallLogsStats from '@/pages/CallLogsStats'
import SMSCharts from '@/pages/SMSCharts'

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
      path: '/Data1',
      name: 'Data1',
      component: Data1
    },
    {
      path: '/Data2',
      name: 'Data2',
      component: Data2
    },
    {
      path: '/bluetooth',
      name: 'BluetoothCharts',
      component: BluetoothCharts
    },
    {
      path: '/battery',
      name: 'BatteryCharts',
      component: BatteryCharts
    },
    {
      path: '/callLogs',
      name: 'CallLogsStats',
      component: CallLogsStats
    },
    {
      path: '/SMS',
      name: 'SMSCharts',
      component: SMSCharts
    }
  ]
})
