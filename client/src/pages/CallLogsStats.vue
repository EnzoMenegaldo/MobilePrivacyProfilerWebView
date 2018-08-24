<template>
  <container v-on:mouseover="resize()">
    <b-row class="firstRow" align-h="center">
      <b-clo>
        <router-link to="/Data1"><div class="returnBtn">Retour</div></router-link>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-clo>
        <div class="title">Journal des appels</div>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-col cols="auto"><div>Début :</div><date-picker v-model="cursorStart" lang="fr" :not-before="firstDate" :not-after="cursorEnd" confirm></date-picker></b-col>
      <b-col cols="auto"><div>Fin :</div><date-picker v-model="cursorEnd" lang="fr" :not-before="cursorStart" :not-after="lastDate" confirm></date-picker></b-col>
    </b-row>
    <b-row>
      <b-col offset="1" cols="5">
        <div class="chartTitle">Nombre d'appel par jour</div><div> (dans la période sélectionnée)</div>
        <div>
          <bar-chart
            id="activityOverTimeNb"
            :data="activityOverTime"
            xkey="day"
            ykeys='[ "nb" ]'
            bar-colors='[ "#36A2EB" ]'
            :hoverCallback="hoverTextFormatterForNbOverTime"
            axes="false"
            grid="true"
            grid-test-weight="bold"
            hideHover="true"
            resize="true"
          ></bar-chart>
        </div>
      </b-col>
      <b-col cols="5">
        <div class="chartTitle">Temps d'appel par jour</div><div> (dans la période sélectionnée)</div>
        <div>
          <bar-chart
            id="activityOverTimeDuration"
            :data="activityOverTime"
            xkey="day"
            ykeys='[ "duration" ]'
            bar-colors='[ "#36A2EB" ]'
            :hoverCallback="hoverTextFormatterForDurationOverTime"
            axes="false"
            grid="true"
            grid-test-weight="bold"
            hideHover="true"
            resize="true"
          ></bar-chart>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset="1" cols="5">
        <div class="chartTitle">Nombre d'appel par heure de la journée</div><div> (dans la période sélectionnée)</div>
        <div>
          <bar-chart
            id="activityOverTheDayNb"
            :data="activityOverTheDay"
            xkey="hour"
            ykeys='[ "nb" ]'
            bar-colors='[ "#36A2EB" ]'
            :hoverCallback="hoverTextFormatterForNbOverDay"
            axes="false"
            grid="true"
            grid-test-weight="bold"
            hideHover="true"
            resize="true"
          ></bar-chart>
        </div>
      </b-col>
      <b-col cols="5">
        <div class="chartTitle">Temps d'appel par heure de la journée</div><div> (dans la période sélectionnée)</div>
        <div>
          <bar-chart
            id="activityOverTheDayTime"
            :data="activityOverTheDay"
            xkey="hour"
            ykeys='[ "duration" ]'
            bar-colors='[ "#36A2EB" ]'
            :hoverCallback="hoverTextFormatterForDurationOverDay"
            axes="false"
            grid="true"
            grid-test-weight="bold"
            hideHover="true"
            resize="true"
          ></bar-chart>
        </div>
      </b-col>
    </b-row>
    <b-row class="row" align-h="around" align-v="center">
      <b-col cols="4">
        <img src=".././assets/logo-phone.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <div class="chartTitle">Statistiques des appels :</div>
          <container>
            <b-row class="statsCell"><b-col>Temps total d'appel : {{displayedTotalDuration}}</b-col></b-row>
            <b-row class="statsCell"><b-col>Nombre total d'appel : {{callStats.totalNb}}</b-col></b-row>
            <b-row align-h="start">
              <b-col>
                <container>
                  <b-row><b-col class="titleStatsCell">Pourcentage d'appel : </b-col></b-row>
                  <b-row ><b-col class="statsCell">- émit : {{outgoingCallPercentage}}</b-col></b-row>
                  <b-row ><b-col class="statsCell">- reçu : {{incomingCallPercentage}}</b-col></b-row>
                  <b-row ><b-col class="statsCell">- manqué : {{missedCallPercentage}}</b-col></b-row>
                </container>
              </b-col>
              <b-col>
                <container>
                  <b-row class="titleStatsCell"><b-col>Temps moyen des appels :</b-col></b-row>
                  <b-row ><b-col class="statsCell">- reçus : {{averageIncomingDuration}}</b-col></b-row>
                  <b-row ><b-col class="statsCell">- émis : {{averageOutgoingDuration}}</b-col></b-row>
                  <b-row ><b-col class="statsCell">.</b-col></b-row>
                </container>
              </b-col>
            </b-row>
            <b-row><b-col class="titleStatsCell">Quartiles : </b-col></b-row>
            <b-row><b-col class="statsCell">Min : {{quartiles.min}}</b-col><b-col class="statsCell">Q1 : {{quartiles.q1}}</b-col></b-row>
            <b-row><b-col class="statsCell">Médiane : {{quartiles.q2}}</b-col></b-row>
            <b-row><b-col class="statsCell">Q3 : {{quartiles.q3}}</b-col><b-col class="statsCell">Max : {{quartiles.max}}</b-col></b-row>
          </container>

      </b-col>
    </b-row>
    <b-row>
      <b-col offset="1" cols="5">
        <div class="chartTitle">Nombre d'appel par contact :</div>
        <div>
          <bar-chart
            id="activityByContactsCallNb"
            :data="activityByContactsData"
            xkey="name"
            ykeys='[ "nbOfCall" ]'
            bar-colors='[ "#36A2EB" ]'
            axes="false"
            grid="true"
            grid-test-weight="bold"
            hideHover="true"
            resize="true"
          ></bar-chart>
        </div>
      </b-col>
      <b-col cols="5">
        <div class="chartTitle">Temps d'appel par contact :</div>
        <div>
          <bar-chart
            id="activityByContactsCallTime"
            :data="activityByContactsData"
            xkey="name"
            ykeys='[ "callTime" ]'
            :hoverCallback="hoverTextFormatter"
            bar-colors='[ "#36A2EB" ]'
            axes="false"
            grid="true"
            grid-test-weight="bold"
            hideHover="true"
            resize="true"
          ></bar-chart>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table striped outlined bordered footClone :items="callLogs" :fields="tableFields">
        </b-table>
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
import { BarChart } from 'vue-morris'

export default {
  name: 'CallLogsStats',
  data () {
    return {
      callLogs: [
        {'_id': 0, 'phoneNumber': '1111111111', 'name': 'Titi', 'type': 'Manqué', 'duration': 0, 'date': 1501100000000, '_rowVariant': 'danger'},
        {'_id': 1, 'phoneNumber': '2222222222', 'name': 'Toto', 'type': 'Entrant', 'duration': 61, 'date': 1502200000000, '_rowVariant': 'info'},
        {'_id': 2, 'phoneNumber': '3333333333', 'name': 'Tutu', 'type': 'Sortant', 'duration': 4000, 'date': 1503300000000, '_rowVariant': 'success'}
      ],
      activityByContactsData: [
        {name: 'Titi', nbOfCall: 70, callTime: 10},
        {name: 'Toto', nbOfCall: 20, callTime: 20},
        {name: 'Tutu', nbOfCall: 10, callTime: 70}
      ],
      tableFields: [
        {
          key: 'type',
          sortable: true,
          label: 'Type'
        },
        {
          key: 'name',
          sortable: true,
          label: 'Nom'
        },
        {
          key: 'phoneNumber',
          sortable: true,
          label: 'Numéro de téléphone'
        },
        {
          key: 'duration',
          sortable: true,
          label: 'Durée',
          formatter: (value) => { return this.displayDuration(value) }
        },
        {
          key: 'date',
          sortable: true,
          label: 'Date',
          formatter: (value) => { return this.dateFormatter(value) }
        }
      ],
      callStats: {
        incomingNb: 0,
        outcomingNb: 0,
        missedNb: 0,
        totalNb: 0,
        totalCallDuration: 0,
        incomingDuration: 0,
        outgoingDuration: 0
      },
      firstDate: 14,
      cursorStart: 14,
      cursorEnd: 86400014,
      lastDate: 86400014,
      activityOverTheDay: [
        {hour: 0, duration: 0, nb: 0},
        {hour: 1, duration: 12, nb: 1},
        {hour: 2, duration: 600, nb: 2},
        {hour: 3, duration: 0, nb: 0},
        {hour: 4, duration: 0, nb: 0},
        {hour: 5, duration: 0, nb: 0},
        {hour: 6, duration: 0, nb: 0},
        {hour: 7, duration: 0, nb: 0},
        {hour: 8, duration: 0, nb: 0},
        {hour: 9, duration: 0, nb: 0},
        {hour: 10, duration: 0, nb: 0},
        {hour: 11, duration: 0, nb: 0},
        {hour: 12, duration: 0, nb: 0},
        {hour: 13, duration: 0, nb: 0},
        {hour: 14, duration: 0, nb: 0},
        {hour: 15, duration: 0, nb: 0},
        {hour: 16, duration: 0, nb: 0},
        {hour: 17, duration: 0, nb: 0},
        {hour: 18, duration: 0, nb: 0},
        {hour: 19, duration: 0, nb: 0},
        {hour: 20, duration: 0, nb: 0},
        {hour: 21, duration: 0, nb: 0},
        {hour: 22, duration: 0, nb: 0},
        {hour: 23, duration: 0, nb: 0}
      ],
      activityOverTime: [
        {day: 1501100000000, duration: 500, nb: 2},
        {day: 1501186400000, duration: 500, nb: 2},
        {day: 1501272800000, duration: 5000, nb: 20},
        {day: 1501359200000, duration: 400, nb: 6}
      ]
    }
  },
  mounted () {
    this.getCallLogsStats()
  },
  computed: {
    activeUser: function () {
      return this.$store.state.activeUser
    },
    quartiles: function () {
      let min, q1, q2, q3, max
      min = 0
      q1 = 0
      q2 = 0
      q3 = 0
      max = 0
      let tempArray = []
      if (this.callLogs.length > 0) {
        tempArray = this.sortByProperty(this.callLogs, 'duration')
        let length = tempArray.length
        min = tempArray[0].duration
        max = tempArray[length - 1].duration
        q1 = tempArray[Math.round((length - 1) * 0.25)].duration
        q3 = tempArray[Math.round((length - 1) * 0.75)].duration
        if (length % 2 === 0) {
          q2 = Math.round(
            (
              tempArray[(length / 2) - 1].duration + tempArray[length / 2].duration
            ) / 2
          )
        } else {
          q2 = tempArray[Math.trunc(length / 2)].duration
        }
      }
      return {
        'min': this.displayDuration(min),
        'q1': this.displayDuration(q1),
        'q2': this.displayDuration(q2),
        'q3': this.displayDuration(q3),
        'max': this.displayDuration(max) }
    },
    outgoingCallPercentage: function () {
      return this.displayPercentage(this.callStats.outcomingNb, this.callStats.totalNb)
    },
    displayedTotalDuration: function () {
      return this.displayDuration(this.callStats.totalCallDuration)
    },
    missedCallPercentage: function () {
      return this.displayPercentage(this.callStats.missedNb, this.callStats.totalNb)
    },
    incomingCallPercentage: function () {
      return this.displayPercentage(this.callStats.incomingNb, this.callStats.totalNb)
    },
    averageIncomingDuration: function () {
      return this.displayAverageDuration(this.callStats.incomingDuration, this.callStats.incomingNb)
    },
    averageOutgoingDuration: function () {
      return this.displayAverageDuration(this.callStats.outgoingDuration, this.callStats.outcomingNb)
    }
  },
  components: { BarChart, DatePicker },
  watch: {
    cursorStart: function () {
      this.generateActivityOverTime()
      this.generateActivityOverTheDay()
    },
    cursorEnd: function () {
      this.generateActivityOverTime()
      this.generateActivityOverTheDay()
    },
    activeUser: async function () {
      this.fetchAndProcessCallLogsData()
    },
    callLogs: function () {
      let result = []
      for (let i = 0; i < this.callLogs.length; i++) {
        let callLogEntry = this.callLogs[i]
        // is the entry related to a result entry?
        let isInResult = false

        for (let j = 0; !isInResult && j < result.length; j++) {
          if (result[j].name === callLogEntry.name) {
            isInResult = true
            result[j].nbOfCall++
            result[j].callTime += callLogEntry.duration
          }
        }
        // if false : create new entry else update related entry
        if (!isInResult) {
          result.push(
            {name: callLogEntry.name, nbOfCall: 1, callTime: callLogEntry.duration}
          )
        }
      }
      this.activityByContactsData = result
      this.cursorStart = this.firstDate
      this.cursorEnd = this.lastDate
      this.generateActivityOverTime()
      this.generateActivityOverTheDay()
    }
  },
  methods: {
    generateActivityOverTime () {
      let result = []
      // initialize result object
      // get the start of the day from cursorStart
      let tempDate = (new Date(this.cursorStart) + '').substring(0, 15)
      let cursorStartOfDay = new Date(tempDate).getTime()
      let cursorEndLong = new Date(this.cursorEnd).getTime()
      let numberOfEntry = Math.trunc((cursorEndLong - cursorStartOfDay) / 86400000) + 1
      for (let j = 0; j < numberOfEntry; j++) {
        result.push({ day: (cursorStartOfDay + j * 86400000), nb: 0, duration: 0 })
      }
      // for every collLog in time range
      for (let i = 0; i < this.callLogs.length; i++) {
        let endOfTheDayOfEndCursor = (new Date(this.cursorEnd).getTime()) + 86400000
        if ((this.callLogs[i].date >= new Date(this.cursorStart).getTime()) && (this.callLogs[i].date <= (endOfTheDayOfEndCursor))) {
          let hasToBeProcessed = true

          for (let k = 0; hasToBeProcessed && (k < result.length); k++) {
            if (this.callLogs[i].date < result[k].day + 86400000) {
              hasToBeProcessed = false
              result[k].nb++
              result[k].duration += this.callLogs[i].duration
            }
          }
        }
      }
      this.activityOverTime = result
    },
    generateActivityOverTheDay () {
      let result = []
      // initialize result object
      for (let i = 0; i < 24; i++) {
        result.push({hour: i, duration: 0, nb: 0})
      }
      // modify proper result entry if the entry qualify for selected time selection
      for (let i = 0; i < this.callLogs.length; i++) {
        let endOfTheDayOfEndCursor = (new Date(this.cursorEnd).getTime()) + 86400000
        if ((this.callLogs[i].date >= new Date(this.cursorStart).getTime()) && (this.callLogs[i].date <= (endOfTheDayOfEndCursor))) {
          let resultEntryToUpdate = new Date(this.callLogs[i].date).getHours()
          result[resultEntryToUpdate].duration = result[resultEntryToUpdate].duration + this.callLogs[i].duration
          result[resultEntryToUpdate].nb = result[resultEntryToUpdate].nb + 1
        }
      }
      this.activityOverTheDay = result
    },
    async fetchAndProcessCallLogsData () {
      const response = await FetchService.fetchLogCalls({ UserId: this.$store.state.activeUser })
      let responseData = response.data
      let dataToDisplay = []
      let firstDate = null
      let lastDate = null
      // for each call log
      for (let i = 0; i < responseData.length; i++) {
        // prepare item parameter
        let _id, phoneNumber, date, type, duration, name, _rowVariant
        let obj = responseData[i]
        _id = obj._id
        phoneNumber = obj.phoneNumber
        date = obj.date
        if (firstDate == null || date < firstDate) { firstDate = date }
        if (lastDate == null || date > lastDate) { lastDate = date }
        duration = obj.duration
        switch (obj.callType) {
          case 'OUTGOING' :
            type = 'Sortant'
            _rowVariant = 'success'
            break
          case 'INCOMING' :
            type = 'Entrant'
            _rowVariant = 'info'
            break
          case 'MISSED' :
            type = 'Manqué'
            _rowVariant = ''
            break
          default:
            type = 'Unknown'
            _rowVariant = 'danger'
            break
        }
        name = 'Inconnu'
        // add entry to the list
        dataToDisplay.push(
          {
            '_id': _id,
            'phoneNumber': phoneNumber,
            'name': name,
            'type': type,
            'duration': duration,
            'date': date,
            '_rowVariant': _rowVariant
          }
        )
      } // end forEach log
      // request contact's phoneNumbers
      let responseName = await FetchService.fetchNameAndNumber({ UserId: this.$store.state.activeUser })
      let responseNameData = responseName.data
      // looking for names from phone numbers and changing name = 'unknown' if possible
      for (let i = 0; i < dataToDisplay.length; i++) {
        let requestedContact = []
        let refPhoneNumber = Diver.spaceRemover(dataToDisplay[i].phoneNumber)
        if (refPhoneNumber.length > 9) {
          refPhoneNumber = refPhoneNumber.substring(refPhoneNumber.length - 9, refPhoneNumber - 1)
        }
        for (let j = 0; j < responseNameData.length; j++) {
          let compPhoneNumber = Diver.spaceRemover(responseNameData[j].phoneNumber + '')
          if (refPhoneNumber.length < 5 && (compPhoneNumber === refPhoneNumber)) {
            requestedContact.push(responseNameData[j])
          } else if (refPhoneNumber.length > 5 && compPhoneNumber.includes(refPhoneNumber)) {
            requestedContact.push(responseNameData[j])
          }
        }
        if (requestedContact.length > 0) {
          dataToDisplay[i].name = requestedContact[requestedContact.length - 1].displayName
        }
      }
      // now setting up callStats :
      let incomingNb = 0
      let outcomingNb = 0
      let missedNb = 0
      let totalNb = 0
      let totalCallDuration = 0
      let incomingDuration = 0
      let outgoingDuration = 0
      for (let i = 0; i < dataToDisplay.length; i++) {
        switch (dataToDisplay[i].type) {
          case 'Entrant' : incomingNb++
            incomingDuration += dataToDisplay[i].duration
            break
          case 'Manqué' : missedNb++
            break
          case 'Sortant' : outcomingNb++
            outgoingDuration += dataToDisplay[i].duration
            break
          default :
            break
        }
        totalNb++
        totalCallDuration += dataToDisplay[i].duration
      }
      this.callStats.incomingNb = incomingNb
      this.callStats.outcomingNb = outcomingNb
      this.callStats.missedNb = missedNb
      this.callStats.totalNb = totalNb
      this.callStats.totalCallDuration = totalCallDuration
      this.callStats.incomingDuration = incomingDuration
      this.callStats.outgoingDuration = outgoingDuration

      this.firstDate = firstDate
      this.lastDate = lastDate

      this.callLogs = dataToDisplay
    },
    async getCallLogsStats () {
      this.fetchAndProcessCallLogsData()
    },
    resize () {
      window.dispatchEvent(new Event('resize'))
    },
    dateFormatter (millisecondDate) {
      return Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM# #YYYY#', millisecondDate)
    },
    displayDuration (duration) {
      if (duration < 60) {
        return Diver.dateFormatter('#s# s', (duration * 1000) + 82800000)
      } else if (duration < 3600) {
        return Diver.dateFormatter('#m# min #s# s', (duration * 1000) + 82800000)
      } else if (duration < 86400) {
        return Diver.dateFormatter('#hhh# h #m# min #s# s', (duration * 1000) + 82800000)
      } else {
        return Math.trunc(duration / 86400) + ' j ' + Diver.dateFormatter('#hhh# h #m# min #s# s', (duration * 1000) + 82800000)
      }
    },
    displayPercentage (q, tot) {
      if (tot === 0) { return '0 %' }
      let result = ''
      result = result + Math.round((q / tot) * 1000) / 10
      return result + ' %'
    },
    displayAverageDuration (time, number) {
      if (number === 0) { return 0 }
      return this.displayDuration(Math.trunc(time / number))
    },
    sortByProperty (array, propertyName) {
      return array.sort(function (a, b) {
        return a[propertyName] - b[propertyName]
      })
    },
    hoverTextFormatter (index, options, content, row) {
      let txt = '<b>' + row.name + '</b><br/>' + ' Temps total : <font color="#00bfff">' + this.displayDuration(row.callTime) + '</font>'
      return txt
    },
    hoverTextFormatterForNbOverDay (index, options, content, row) {
      let txt = '<b>' + row.hour + ' h </b><br/>' + ' Nombre d\'appel : <font color="#00bfff">' + row.nb + '</font>'
      return txt
    },
    hoverTextFormatterForDurationOverDay (index, options, content, row) {
      let txt = '<b>' + row.hour + ' h </b><br/>' + ' Durée d\'appel : <font color="#00bfff">' + this.displayDuration(row.duration) + '</font>'
      return txt
    },
    hoverTextFormatterForNbOverTime (index, options, content, row) {
      let txt = '<b>' + Diver.dateFormatter('#DDD# #DD# #MMMM# #YYYY#', row.day) + ' </b><br/>' + ' Nombre d\'appel : <font color="#00bfff">' + row.nb + '</font>'
      return txt
    },
    hoverTextFormatterForDurationOverTime (index, options, content, row) {
      let txt = '<b>' + Diver.dateFormatter('#DDD# #DD# #MMMM# #YYYY#', row.day) + ' </b><br/>' + ' Temps d\'appel : <font color="#00bfff">' + this.displayDuration(row.duration) + '</font>'
      return txt
    }
  }
}
</script>

<style scoped>
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
  .chartTitle
  {
    height: 40px;
    padding: 15px;
    margin-bottom: 10px;

    font-size: 18px;
    font-weight: 600;
    color: #194bfa;
  }
  .statsCell{
    background-color: lightyellow;
    border-style: solid;
    border-width: .5px;
  }
  .titleStatsCell{
    font-weight: 300;
    color: #194bfa;

    background-color: #b9bbbe;
    border-style: solid;
    border-width: 1px;
    border-color: #1b1e21;
  }
</style>
