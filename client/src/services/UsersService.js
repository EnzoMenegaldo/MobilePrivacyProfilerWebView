import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().post('Users')
  }
}
