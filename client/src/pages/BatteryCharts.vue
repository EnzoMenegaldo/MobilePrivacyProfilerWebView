<template>
  <container>
    <b-row class="firstRow" align-h="center">
      <b-clo>
        <router-link to="/Data1"><div class="returnBtn">Retour</div></router-link>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-clo>
        <div class="title">Suivit de la batterie</div>
      </b-clo>
    </b-row>
    <b-row class="row chart" align-h="center" align-v="center">
      <b-col cols="10"><img src=".././assets/logo-battery.png" height="200px"/></b-col>
    </b-row>

    <b-row class="row" align-h="center" align-v="center">
      <b-col cols="5">
        <img src=".././assets/logo-battery.png" height="200px"/>
      </b-col>
      <b-col cols="5">
        <b-list-group class="list-group">
          <b-list-group-item class="group-item" v-for="chargeEvent in chargeEvents" :key="chargeEvent._id">
            <container>
              <b-row align-v="center" align-h="center">
                <b-col cols="2"><i class="icon" :class="chargeEvent.icon" aria-hidden="true"></i></b-col>
                <b-col >
                  <container>
                    <b-row align-v="center" align-h="start">
                      <b-col cols="10"><div class="txtType">TODO</div></b-col>
                    </b-row>
                    <b-row align-v="center" align-h="start">
                      <b-col offset="1" cols="5"><div class="txtDate">Début : TODO</div></b-col>
                      <b-col cols="5"><div class="txtDate">Fin : TODO</div></b-col>
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

export default {
  name: 'BatteryCharts',
  data () {
    return {
      chargeEvents: [
        { '_id': 0, 'icon': 'fa fa-question-circle fa-4x', 'type': 'No connection to server', 'start': 'date', 'end': 'date' },
        { '_id': 1, 'icon': 'fa fa-usb fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' },
        { '_id': 2, 'icon': 'fa fa-plug fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' },
        { '_id': 3, 'icon': 'fa fa-rss fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' },
        { '_id': 4, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' },
        { '_id': 5, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' },
        { '_id': 6, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' },
        { '_id': 7, 'icon': 'fa fa-question-circle fa-4x', 'type': 'Unknown', 'start': 'date', 'end': 'date' }
      ]
    }
  },
  mounted () {
    this.getBatteryStates(this.$store.state.activeUser)
  },
  computed: {
    activeUser: function () {
      return this.$store.state.activeUser
    }
  },
  watch: {
    activeUser: async function () {
      const response = await UsersService.fetchBatteryStates({ UserId: this.$store.state.activeUser })
      var responseData = response.data
      var dataToDisplay = []
      responseData.forEach(
        function (obj) {
          dataToDisplay.push(
            {
              TODO
            }
          )
        }
      )
      if (dataToDisplay.length === 0) {
        dataToDisplay.push(
          {
            '_id': 0,
            'icon': 'fa fa-question-circle fa-4x',
            'type': 'No entrée en base', 'start': 'null', 'end': 'null'
          }
        )
      }
      this.chargeEvents = dataToDisplay
    }
  },
  methods: {
    async getBluetoothDevices () {
      const response = await UsersService.fetchBatteryStates({ UserId: this.$store.state.activeUser })
      var responseData = response.data
      var dataToDisplay = []
      responseData.forEach(
        function (obj) {
          dataToDisplay.push(
            {
              TODO
            }
          )
        }
      )
      if (dataToDisplay.length === 0) {
        dataToDisplay.push(
          {
            TODO
          }
        )
      }
      this.chargeEvents = dataToDisplay
    }
  }
}
</script>

<style scoped>
  .chart{
    margin: 20px;
  }
  .firstRow{
    margin-top: 20px;
  }
  .returnBtn{
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
    border-radius: .5em;
    margin-right: 0;
  }
  .title
  {
    height: 40px;
    padding: 15px;
    margin: 10px;
    margin-bottom: 20px;

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
  .txtDate{
    font-size: 14px;
  }
</style>
