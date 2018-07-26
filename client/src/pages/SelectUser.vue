<template>
  <div id="userList">
    <lu>
      <li v-for="user in users" :key="user._id" >{{user.userId}}</li>
    </lu>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  name: 'SelectUser',
  data () {
    return {
      users: [{ '_id': 0, 'userId': 'Server connection failed' }]
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data
    }
  }
}
</script>

<style scoped>

</style>
