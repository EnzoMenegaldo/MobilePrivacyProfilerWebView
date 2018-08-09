<template>
  <container v-on:mouseover="resize()">
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
    <b-row align-h="center">
      <b-col cols="auto"><div>Début :</div><date-picker v-model="cursorStart" lang="fr" :not-before="firstDate" :not-after="cursorEnd" confirm></date-picker></b-col>
      <b-col cols="auto"><div>Fin :</div><date-picker v-model="cursorEnd" lang="fr" :not-before="cursorStart" :not-after="lastDate" confirm></date-picker></b-col>
    </b-row>
    <b-row class="row chart" align-h="center" align-v="center">
      <b-col  cols="10">
        <line-chart id="batteryChartId"
                    :data="batteryChartDisplayedData"
                    xkey="date"
                    ykeys='[ "lvl" ]'
                    :ymin= "auto"
                    :ymax= "auto"
                    :dateFormat="dateFormatter"
                    :xLabelFormat="dateFormatter2"
                    line-colors='[ "#194bfa" ]'
                    grid="true"
                    grid-text-weight="bold"
                    pointSize="2px"
                    hideHover="true"
                    resize="true">
        </line-chart>
      </b-col>
    </b-row>

    <b-row class="row" align-h="around" align-v="center">
      <b-col cols="4">
        <img src=".././assets/logo-battery.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <div>Liste des évènements de charge :</div>
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
import DatePicker from 'vue2-datepicker'
import FetchService from '@/services/FetchService'
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
// eslint-disable-next-line
import { LineChart } from 'vue-morris'

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
      batteryChartDisplayedData: [
        {date: 1530800000000, lvl: 5},
        {date: 1530900000000, lvl: 55},
        {date: 1531000000000, lvl: 20},
        {date: 1531100000000, lvl: 75}
      ],
      batteryChartData: [
        {date: 1530800000000, lvl: 5},
        {date: 1530900000000, lvl: 55},
        {date: 1531000000000, lvl: 20},
        {date: 1531100000000, lvl: 75}
      ],
      ymin: 0,
      ymax: 100,
      firstDate: 14,
      cursorStart: 14,
      cursorEnd: 14,
      lastDate: 14
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
  components: { LineChart, DatePicker },
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
            startDate = Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM#', startDateToTransform)
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
            endDate = Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM#', endDateToTransform)
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
      // end of processing for charge event display
      // now processing to display lineChart:
      var chartDataToDisplay = []
      for (i = 0; i < responseData.length; i++) {
        obj = responseData[i]

        chartDataToDisplay.push({date: obj.date, lvl: obj.level})
      }
      this.batteryChartData = chartDataToDisplay
      this.batteryChartDisplayedData = this.batteryChartData
      // setup first,last date and cursors's date
      if (responseData.length > 1) {
        this.firstDate = responseData[0].date
        this.cursorStart = this.firstDate
        this.lastDate = responseData[responseData.length - 1].date
        this.cursorEnd = this.lastDate
      }
    },
    cursorStart: function () {
      var result = []
      for (let i = 0; i < this.batteryChartData.length; i++) {
        let endOfTheDayOfEndCursor = (new Date(this.cursorEnd).getTime()) + 86400000
        if ((this.batteryChartData[i].date >= new Date(this.cursorStart).getTime()) && (this.batteryChartData[i].date <= (endOfTheDayOfEndCursor))) {
          result.push(this.batteryChartData[i])
        }
      }
      this.batteryChartDisplayedData = result
    },
    cursorEnd: function () {
      var result = []
      for (let i = 0; i < this.batteryChartData.length; i++) {
        let endOfTheDayOfEndCursor = (new Date(this.cursorEnd).getTime()) + 86400000
        if ((this.batteryChartData[i].date >= new Date(this.cursorStart).getTime()) && (this.batteryChartData[i].date <= (endOfTheDayOfEndCursor))) {
          result.push(this.batteryChartData[i])
        }
      }
      this.batteryChartDisplayedData = result
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
            startDate = Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM#', startDateToTransform)
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
            endDate = Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM#', endDateToTransform)
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
      // end of processing for charge event display
      // now processing to display lineChart:
      var chartDataToDisplay = []

      for (i = 0; i < responseData.length; i++) {
        obj = responseData[i]
        chartDataToDisplay.push({date: obj.date, lvl: obj.level})
      }
      this.batteryChartData = chartDataToDisplay
      this.batteryChartDisplayedData = this.batteryChartData
      // setup first,last date and cursors's date
      if (responseData.length > 1) {
        this.firstDate = responseData[0].date
        this.cursorStart = this.firstDate
        this.lastDate = responseData[responseData.length - 1].date
        this.cursorEnd = this.lastDate
      }
    },
    resize () {
      window.dispatchEvent(new Event('resize'))
    },
    dateFormatter (millisecondDate) {
      return Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM#', millisecondDate)
    },
    dateFormatter2 (millisecondDate) {
      return Diver.dateFormatter('#DD# #MMMM#', millisecondDate)
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
