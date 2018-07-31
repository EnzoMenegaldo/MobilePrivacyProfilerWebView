<template>
  <container :key=reloadKey>
    <b-row class="firstRow" align-h="center">
      <b-clo>
        <div class="title">Liste des périphériques bluetooth</div>
      </b-clo>
    </b-row>
    <b-row class="row" align-h="center" align-v="center">
      <b-col cols="5">
        <img src=".././assets/logo-bluetooth.png" height="200px"/>
      </b-col>
      <b-col cols="5">
        <b-list-group class="list-group">
          <b-list-group-item class="group-item" v-for="device in devices" :key="device._id">
            <container>
              <b-row align-v="center" align-h="center">
                <b-col cols="2"><i class="icon" :class="device.icon" aria-hidden="true"></i></b-col>
                <b-col >
                  <container>
                    <b-row align-v="center" align-h="start">
                      <b-col cols="10"><div class="txtType">{{device.type}}</div></b-col>
                    </b-row>
                    <b-row align-v="center" align-h="start">
                      <b-col cols="10"><div class="txtName">{{device.name}}</div></b-col>
                    </b-row>
                    <b-row align-v="center" align-h="start">
                      <b-col cols="10"><div class="txtMac">{{device.mac}}</div></b-col>
                    </b-row>
                  </container>
                </b-col>
              </b-row>
            </container>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="5">
      </b-col>
    </b-row>
  </container>
</template>

<script>
import UsersService from '@/services/UsersService'
import Diver from '@/services/Diver'

export default {
  name: 'BluetoothCharts',
  data () {
    return {
      devices: [
        { '_id': 0, 'icon': 'fa fa-question-circle fa-4x', 'type': 'No connection to server', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 1, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 2, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 3, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 4, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 5, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 6, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' },
        { '_id': 7, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'name': 'Unknown', 'mac': 'FF:FF:FF:FF:FF:FF' }
      ]
    }
  },
  mounted () {
    this.getBluetoothDevices(this.$store.state.activeUser)
  },
  computed: {
    reloadKey () {
      return this.$store.state.activeUser
    }
  },
  methods: {
    async getBluetoothDevices () {
      const response = await UsersService.fetchBluetoothDevices({ UserId: this.$store.state.activeUser })
      var responseData = response.data
      var dataToDisplay = []
      responseData.forEach(
        function (obj) {
          var typeObject = Diver.fromIntTypeToTypeDetail(obj.type)
          dataToDisplay.push(
            {
              '_id': obj._id,
              'icon': typeObject.icon,
              'type': typeObject.typeName,
              'name': obj.name,
              'mac': obj.mac
            }
          )
        }
      )
      this.devices = dataToDisplay
    }
  }
}
</script>

<style scoped>
.firstRow{
  margin: 20px;
}
.title
{
  height: 40px;
  padding: 15px;
  margin: 10px;

  font-size: 18px;
  font-weight: 900;
  color: #194bfa;
}
.list-group{
  max-height: 500px;
  margin-bottom: 10px;
  overflow:scroll;
  -webkit-overflow-scrolling: touch;
}
.group-item{
  background-color: lightyellow;

}
.icon{
  color: #194bfa;
}
.txtType{
  font-weight: 900;
  font-size: 16px;
  color: #000000;
}
.txtName{
  font-size: 14px;
}
.txtMac{
  font-style: italic;
  font-size: 14px;
  color: #858585;
}
</style>
