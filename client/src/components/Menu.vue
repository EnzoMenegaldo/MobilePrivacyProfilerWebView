<template>
  <div id="userList">
    <lu v-for="user in users" :key="user._id">
      <li>{{user.userId}}</li>
    </lu>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'

export default {
  name: 'Menu',
  data () {
    return {
      users: []
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
