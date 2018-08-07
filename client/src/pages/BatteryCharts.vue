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
      <b-col cols="10">
        <donut-chart id="donut"
                                    :data="donutData"
                                    :colors="arrayColors"
                                    resize="true">
        </donut-chart>
        <line-chart id="line"

                    :data="lineData"
                    xkey="year"
                    ykeys='[ "a", "b" ]'
                    line-colors='[ "#FF6384", "#73c000" ]'
                    grid=" true"
                    grid-text-weight="bold"
                    resize="true">
        </line-chart>
      </b-col>
    </b-row>

    <b-row class="row" align-h="around" align-v="center">
      <b-col cols="4">
        <img src=".././assets/logo-battery.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <b-list-group class="list-group">
          <b-list-group-item class="group-item" v-for="chargeEvent in chargeEvents" :key="chargeEvent._id">
            <container>
              <b-row align-v="center" align-h="center">
                <b-col cols="3"><i class="icon" :class="chargeEvent.icon" aria-hidden="true"></i></b-col>
                <b-col cols="8">
                  <container>
                    <b-row align-v="center" align-h="center">
                      <b-col cols="auto"><div class="txtType">{{chargeEvent.type}}</div></b-col>
                    </b-row>
                    <b-row align-v="center" align-h="center">
                      <b-col cols="auto"><div class="txtDate">Début : {{chargeEvent.start}}</div></b-col>
                      <b-col cols="auto"><div class="txtDate">Fin : {{chargeEvent.end}}</div></b-col>
                    </b-row>
                  </container>
                </b-col>
              </b-row>
            </container>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </container>
</template>

<script>
import Diver from '@/services/Diver'
import FetchService from '@/services/FetchService'
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
// eslint-disable-next-line
import { DonutChart, BarChart, LineChart, AreaChart } from 'vue-morris'

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
      ],
      donutData: [
        { label: 'Echec', value: 40 },
        { label: 'Réussite', value: 150 },
        { label: 'Essai encore', value: 100 }
      ],
      arrayColors: [ '#FF6384', '#73c000', '#FFCE56' ],
      lineData: [
        {year: "2013", a: 10, b: 5},
        {year: "2014", a: 40, b: 15},
        {year: "2015", a: 20, b: 25},
        {year: "2013", a: 30, b: 20}
      ]
    }
  },
  mounted () {
    this.getBatteryStats(this.$store.state.activeUser)
  },
  computed: {
    activeUser: function () {
      return this.$store.state.activeUser
    }
  },
  components: { DonutChart, BarChart, LineChart, AreaChart }, // DonutChart
  watch: {
    activeUser: async function () {
      const response = await FetchService.fetchBatteryStates({ UserId: this.$store.state.activeUser })
      var responseData = response.data
      var dataToDisplay = []
      // construction of the charge event list
      var previousState = false
      var _id
      var startDate
      var endDate
      var plugType
      var plugTypeIcon
      for (var i = 0; i < responseData.length; i++) {
        var obj = responseData[i]
        // were previous entry plugged?
        if (!previousState) { // if not then is it plugged now? (if (no) ? do nothing : set an entry start
          if (obj.isPugged === 1) {
            previousState = true
            _id = obj._id
            var startDateToTransform = new Date(obj.date)
            startDate = Diver.dateFormater('#hhh# h #mm# le #DD#/#MM#', startDateToTransform)
            switch (obj.plugType) { // wasn't plugged but is now
              case 'BATTERY_PLUGGED_USB' :
                plugType = 'USB'
                plugTypeIcon = 'fa fa-usb fa-4x'
                break
              case 'BATTERY_PLUGGED_AC' :
                plugType = 'Secteur'
                plugTypeIcon = 'fa fa-plug fa-4x'
                break
              case 'BATTERY_PLUGGED_WIRELESS' :
                plugType = 'Charge sans fil'
                plugTypeIcon = 'fa fa-rss fa-4x'
                break
              default:
                plugType = 'Inconnu'
                plugTypeIcon = 'fa fa-question-circle fa-4x'
                break
            }
          } else { // wasn't plugged and is not (nothing new)
          }
        } else { // previous entry not plugged
          if (obj.isPugged === 1) { // was plugged and is still (nothing new)
          } else { // was plugged and is not anymore
            previousState = false
            var endDateToTransform = new Date(obj.date)
            endDate = Diver.dateFormater('#hhh# h #mm# le #DD#/#MM#', endDateToTransform)
            dataToDisplay.push(
              {
                '_id': _id,
                'icon': plugTypeIcon,
                'type': plugType,
                'start': startDate,
                'end': endDate
              }
            )
          }
        }
      } // end for on responseData objects

      // display a message if empty list
      if (dataToDisplay.length === 0) {
        dataToDisplay.push(
          {
            '_id': 0,
            'icon': 'fa fa-question-circle fa-4x',
            'type': 'Pas d\'éventement de charge en base',
            'start': 'null',
            'end': 'null'
          }
        )
      }
      this.chargeEvents = dataToDisplay
    }
  },
  methods: {
    async getBatteryStats () {
      const response = await FetchService.fetchBatteryStates({ UserId: this.$store.state.activeUser })
      var responseData = response.data
      var dataToDisplay = []
      // construction of the charge event list
      var previousState = false
      var _id
      var startDate
      var endDate
      var plugType
      var plugTypeIcon
      for (var i = 0; i < responseData.length; i++) {
        var obj = responseData[i]
        // were previous entry plugged?
        if (!previousState) { // if not then is it plugged now? (if (no) ? do nothing : set an entry start
          if (obj.isPugged === 1) {
            previousState = true
            _id = obj._id
            var startDateToTransform = new Date(obj.date)
            startDate = Diver.dateFormater('#hhh# h #mm# le #DD#/#MM#', startDateToTransform)
            switch (obj.plugType) { // wasn't plugged but is now
              case 'BATTERY_PLUGGED_USB' :
                plugType = 'USB'
                plugTypeIcon = 'fa fa-usb fa-4x'
                break
              case 'BATTERY_PLUGGED_AC' :
                plugType = 'Secteur'
                plugTypeIcon = 'fa fa-plug fa-4x'
                break
              case 'BATTERY_PLUGGED_WIRELESS' :
                plugType = 'Charge sans fil'
                plugTypeIcon = 'fa fa-rss fa-4x'
                break
              default:
                plugType = 'Inconnu'
                plugTypeIcon = 'fa fa-question-circle fa-4x'
                break
            }
          } else { // wasn't plugged and is not (nothing new)
          }
        } else { // previous entry not plugged
          if (obj.isPugged === 1) { // was plugged and is still (nothing new)
          } else { // was plugged and is not anymore
            previousState = false
            var endDateToTransform = new Date(obj.date)
            endDate = Diver.dateFormater('#hhh# h #mm# le #DD#/#MM#', endDateToTransform)
            dataToDisplay.push(
              {
                '_id': _id,
                'icon': plugTypeIcon,
                'type': plugType,
                'start': startDate,
                'end': endDate
              }
            )
          }
        }
      } // end for on responseData objects

      // display a message if empty list
      if (dataToDisplay.length === 0) {
        dataToDisplay.push(
          {
            '_id': 0,
            'icon': 'fa fa-question-circle fa-4x',
            'type': 'Pas d\'éventement de charge en base',
            'start': 'null',
            'end': 'null'
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
