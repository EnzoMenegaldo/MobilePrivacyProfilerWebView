<template>
  <container>
    <b-row>
      <b-col><div class="spacer"></div></b-col>
    </b-row>
    <b-row align-h="center" >
      <b-col cols="auto" class="txt-left"><div >Utilisateur actif :</div></b-col>
      <b-col sticky cols="auto" class="txt-right"><div >{{activeUser}}</div></b-col>
    </b-row>
    <b-row>
      <b-col><div class="spacer"></div></b-col>
    </b-row>
    <b-row>
      <b-col>
        <div id="userList">
          <b-button-group vertical>
            <b-button variant="primary" class="test" @click="clearActiveUser()">Réinitialiser</b-button>
            <b-button variant="primary" v-for="user in users" :key="user._id"
                      @click="changeActiveUser(user.userId)"
            >
              {{user.userId}}
            </b-button>
            <b-button variant="primary" @click="clearActiveUser()">Réinitialiser</b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
  </container>

</template>

<script>
import UsersService from '@/services/UsersService'
import BluetoothCharts from '@/pages/BluetoothCharts'

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
  modules: [
    'bootstrap-vue/nuxt'
  ],
  computed: {
    activeUser () {
      return this.$store.state.activeUser
    }
  },
  methods: {
    async getUsers () {
      const response = await UsersService.fetchUsers()
      this.users = response.data
    },
    changeActiveUser: function (userId) {
      this.$store.commit('setActiveUser', userId)
      BluetoothCharts.$forceUpdate()
    },
    clearActiveUser: function (userId) {
      this.$store.commit('clearActiveUser')
    }
  }
}
</script>

<style scoped>
.spacer
{
  height: 40px;
}
.txt-left{
  position: center;
  display: block;
  color: #000;
  text-transform: uppercase;
  text-decoration: none;
  padding: 10px;
  background-color: #194bfa;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  border-bottom-left-radius: .5em;
  border-top-left-radius: .5em;
  margin-right: 0;
}
.txt-right{
  display: block;
  color: #000;
  text-transform: uppercase;
  text-decoration: none;
  padding: 10px;
  background-color: #194bfa;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  border-bottom-right-radius: .5em;
  border-top-right-radius: .5em;
  margin-left: 0;
}
</style>
<style lang="scss" scoped>
  .act{
    margin-top: 10px;
    &__item{
      margin: 0;
      padding: 0;
    }
    &--txt{
      position: relative;
      display: block;
      color: #000;
      text-transform: uppercase;
      text-decoration: none;
      padding: 10px;
      background-color: #194bfa;
      color: #fff;
      font-size: 14px;
      font-weight: 200;
      &--left{
        border-bottom-left-radius: .5em;
        border-top-left-radius: .5em;
      }
      &--right{
        border-bottom-right-radius: .5em;
        border-top-right-radius: .5em;
      }
    }
  }
</style>
