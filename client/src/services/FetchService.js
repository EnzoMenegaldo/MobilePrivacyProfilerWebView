import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().post('Users')
  },
  fetchBluetoothDevices (params) {
    return Api().post('Devices', params)
  },
  fetchBatteryStates (params) {
    return Api().post('Battery', params)
  }
}