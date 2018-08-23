<template>
  <container v-on:mouseover="resize()">
    <b-row class="firstRow" align-h="center">
      <b-clo>
        <router-link to="/Data1"><div class="returnBtn">Retour</div></router-link>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-clo>
        <div class="title">Statistiques des SMS</div>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-col cols="auto"><div>Début :</div><date-picker v-model="cursorStart" lang="fr" :not-before="firstDate" :not-after="cursorEnd" confirm></date-picker></b-col>
      <b-col cols="auto"><div>Fin :</div><date-picker v-model="cursorEnd" lang="fr" :not-before="cursorStart" :not-after="lastDate" confirm></date-picker></b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="chartTitle">Nombre de message par heure de la journée</div>
        <div>
          <bar-chart
            id="activityOverTimeSMS"
            :data="activityOverTime"
            xkey="day"
            ykeys='[ "emit","recu" ]'
            bar-colors='[ "#186717","#152992" ]'
            :hoverCallback="hoverTextFormatterForActivityOverTimeSMS"
            axes="false"
            stacked="true"
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
        <div class="chartTitle">Nombre de message par heure de la journée</div>
        <div>
          <bar-chart
            id="activityOverTheDaySMS"
            :data="activityOverTheDay"
            xkey="hour"
            ykeys='[ "emit","recu" ]'
            bar-colors='[ "#186717","#152992" ]'
            :hoverCallback="hoverTextFormatterForActivityOverTheDaySMS"
            axes="false"
            stacked="true"
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
        <img src=".././assets/logo-sms.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <div class="chartTitle">Statistiques</div>
        <container>
          <b-row class="statsCell"><b-col>Nombre total de messages : {{Stats.totalNb}}</b-col></b-row>
          <b-row align-h="start">
            <b-col>
              <container>
                <b-row><b-col class="titleStatsCell">Nombre de messages : </b-col></b-row>
                <b-row ><b-col class="statsCell">- Emits : {{Stats.outgoingNb}}</b-col></b-row>
                <b-row ><b-col class="statsCell">- Reçus : {{Stats.incomingNb}}</b-col></b-row>
              </container>
            </b-col>
            <b-col>
              <container>
                <b-row><b-col class="titleStatsCell">Pourcentage de messages : </b-col></b-row>
                <b-row ><b-col class="statsCell">- Emits : {{displayPercentage(Stats.outgoingNb,Stats.totalNb)}}</b-col></b-row>
                <b-row ><b-col class="statsCell">- Reçus : {{displayPercentage(Stats.incomingNb,Stats.totalNb)}}</b-col></b-row>
              </container>
            </b-col>
          </b-row>
          </container>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="chartTitle">Nombre de message par contact</div>
        <div>
          <bar-chart
            id="activityByContactSMS"
            :data="activityByContact"
            xkey="name"
            ykeys='[ "emit","recu" ]'
            bar-colors='[ "#186717","#152992" ]'
            :hoverCallback="hoverTextFormatterForActivityByContactSMS"
            axes="false"
            stacked="true"
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
        <b-table striped outlined bordered footClone :items="SMSs" :fields="tableFields">
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
  name: 'SMSCharts',
  data () {
    return {
      SMSs: [
        { '_id': 0, 'name': 'name1', 'date': 1501100000000, 'phoneNumber': '1111111111', 'type': 'émit', '_rowVariant': 'success' },
        { '_id': 1, 'name': 'name2', 'date': 1501200000000, 'phoneNumber': '2222222222', 'type': 'émit', '_rowVariant': 'success' },
        { '_id': 3, 'name': 'name3', 'date': 1501300000000, 'phoneNumber': '3333333333', 'type': 'reçu', '_rowVariant': 'info' }
      ],
      Stats: {
        incomingNb: 0,
        outgoingNb: 0,
        totalNb: 0
      },
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
          key: 'date',
          sortable: true,
          label: 'Date',
          formatter: (value) => { return this.dateFormatter(value) }
        }
      ],
      activityByContact: [
        {name: 'Titi', nbOfMsg: 70, emit: 1, recu: 69},
        {name: 'Riri', nbOfMsg: 15, emit: 8, recu: 7},
        {name: 'Fifi', nbOfMsg: 50, emit: 31, recu: 19}
      ],
      activityOverTheDay: [
        {hour: 0, nb: 0, emit: 0, recu: 0},
        {hour: 1, nb: 1, emit: 0, recu: 1},
        {hour: 2, nb: 2, emit: 1, recu: 1},
        {hour: 3, nb: 0, emit: 0, recu: 0},
        {hour: 4, nb: 0, emit: 0, recu: 0},
        {hour: 5, nb: 0, emit: 0, recu: 0},
        {hour: 6, nb: 0, emit: 0, recu: 0},
        {hour: 7, nb: 0, emit: 0, recu: 0},
        {hour: 8, nb: 0, emit: 0, recu: 0},
        {hour: 9, nb: 0, emit: 0, recu: 0},
        {hour: 10, nb: 0, emit: 0, recu: 0},
        {hour: 11, nb: 0, emit: 0, recu: 0},
        {hour: 12, nb: 0, emit: 0, recu: 0},
        {hour: 13, nb: 0, emit: 0, recu: 0},
        {hour: 14, nb: 0, emit: 0, recu: 0},
        {hour: 15, nb: 0, emit: 0, recu: 0},
        {hour: 16, nb: 0, emit: 0, recu: 0},
        {hour: 17, nb: 0, emit: 0, recu: 0},
        {hour: 18, nb: 0, emit: 0, recu: 0},
        {hour: 19, nb: 0, emit: 0, recu: 0},
        {hour: 20, nb: 0, emit: 0, recu: 0},
        {hour: 21, nb: 0, emit: 0, recu: 0},
        {hour: 22, nb: 0, emit: 0, recu: 0},
        {hour: 23, nb: 0, emit: 0, recu: 0}
      ],
      activityOverTime: [
        {day: 1501100000000, nb: 2, emit: 1, recu: 1},
        {day: 1501186400000, nb: 2, emit: 0, recu: 2},
        {day: 1501272800000, nb: 20, emit: 15, recu: 5},
        {day: 1501359200000, nb: 6, emit: 2, recu: 4}
      ],
      firstDate: 14,
      cursorStart: 14,
      cursorEnd: 86400014,
      lastDate: 86400014
    }
  },
  mounted () {
    this.fetchAndProcessSMSData()
  },
  computed: {
    activeUser: function () {
      return this.$store.state.activeUser
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
      this.fetchAndProcessSMSData()
    },
    SMSs: function () {

      let result = []
      for (let i = 0; i < this.SMSs.length; i++) {
        let SMSsEntry = this.SMSs[i]
        // is the entry related to a result entry?
        let isInResult = false

        for (let j = 0; !isInResult && j < result.length; j++) {
          if (result[j].name === SMSsEntry.name) {
            isInResult = true
            result[j].nbOfMsg++
            if (SMSsEntry.type === 'Emit') {
              result[j].emit++
            } else if (SMSsEntry.type === 'Reçu') {
              result[j].recu++
            }
          }
        }
        // if false : create new entry else update related entry
        if (!isInResult) {
          if (SMSsEntry.type === 'Emit') {
            result.push(
              {name: SMSsEntry.name, nbOfMsg: 1, emit: 1, recu: 0}
            )
          } else if (SMSsEntry.type === 'Reçu') {
            result.push(
              {name: SMSsEntry.name, nbOfMsg: 1, emit: 0, recu: 1}
            )
          }
        }
      }
      this.activityByContact = result

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
      let numberOfEntry = Math.trunc((cursorEndLong - cursorStartOfDay) / 86400000)
      for (let j = 0; j < numberOfEntry; j++) {
        result.push({ day: (cursorStartOfDay + j * 86400000), nb: 0, emit: 0, recu: 0 })
      }
      // for every collLog in time range
      for (let i = 0; i < this.SMSs.length; i++) {
        let endOfTheDayOfEndCursor = (new Date(this.cursorEnd).getTime()) + 86400000
        if ((this.SMSs[i].date >= new Date(this.cursorStart).getTime()) && (this.SMSs[i].date <= (endOfTheDayOfEndCursor))) {
          let hasToBeProcessed = true

          for (let k = 0; hasToBeProcessed && (k < result.length); k++) {
            if (this.SMSs[i].date < result[k].day + 86400000) {
              hasToBeProcessed = false
              result[k].nb++
              if (this.SMSs[i].type === 'Reçu') {
                result[k].recu++
              } else if (this.SMSs[i].type === 'Emit') {
                result[k].emit++
              }
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
        result.push({hour: i, nb: 0, emit: 0, recu: 0})
      }
      // modify proper result entry if the entry qualify for selected time selection
      for (let i = 0; i < this.SMSs.length; i++) {
        let endOfTheDayOfEndCursor = (new Date(this.cursorEnd).getTime()) + 86400000
        if ((this.SMSs[i].date >= new Date(this.cursorStart).getTime()) && (this.SMSs[i].date <= (endOfTheDayOfEndCursor))) {
          let resultEntryToUpdate = new Date(this.SMSs[i].date).getHours()
          result[resultEntryToUpdate].nb++
          if (this.SMSs[i].type === 'Reçu') {
            result[resultEntryToUpdate].recu++
          } else if (this.SMSs[i].type === 'Emit') {
            result[resultEntryToUpdate].emit++
          }
        }
      }
      this.activityOverTheDay = result
    },
    async fetchAndProcessSMSData () {
      const response = await FetchService.fetchSMS({ UserId: this.$store.state.activeUser })
      let responseData = response.data
      let dataToDisplay = []
      let firstDate = null
      let lastDate = null
      // for each SMS row
      for (let i = 0; i < responseData.length; i++) {
        // prepare item parameter
        let _id, phoneNumber, date, type, name, _rowVariant
        let obj = responseData[i]
        _id = obj._id
        phoneNumber = obj.phoneNumber
        date = obj.date
        if (firstDate == null || date < firstDate) { firstDate = date }
        if (lastDate == null || date > lastDate) { lastDate = date }
        switch (obj.type) {
          case 'sent' :
            type = 'Emit'
            _rowVariant = 'success'
            break
          case 'inbox' :
            type = 'Reçu'
            _rowVariant = 'info'
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
            'date': Number(date),
            '_rowVariant': _rowVariant
          }
        )
      } // end forEach SMS row
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
      // now setting up Stats :
      let incomingNb = 0
      let outgoingNb = 0
      let totalNb = 0
      for (let i = 0; i < dataToDisplay.length; i++) {
        switch (dataToDisplay[i].type) {
          case 'Reçu' :
            incomingNb++
            break
          case 'Emit' :
            outgoingNb++
            break
          default :
            break
        }
        totalNb++
      }

      this.Stats.incomingNb = incomingNb
      this.Stats.outgoingNb = outgoingNb
      this.Stats.totalNb = totalNb

      this.firstDate = Number(firstDate)
      this.cursorStart = Number(firstDate)
      this.lastDate = Number(lastDate)
      this.cursorEnd = Number(lastDate)
      this.SMSs = dataToDisplay
    },
    resize () {
      window.dispatchEvent(new Event('resize'))
    },
    dateFormatter (millisecondDate) {
      return Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM# #YYYY#', millisecondDate)
    },
    displayPercentage (q, tot) {
      if (tot === 0) { return '0 %' }
      let result = ''
      result = result + Math.round((q / tot) * 1000) / 10
      return result + ' %'
    },
    hoverTextFormatterForActivityByContactSMS (index, options, content, row) {
      let txt = '<b>' +  row.name + ' </b>'
        + '<br/> Messages émits : <font color="#00bfff">' + row.emit + ' (' + this.displayPercentage(row.emit, row.nbOfMsg) + ')'  +  '</font>'
        + '<br/> Messages reçus : <font color="#00bfff">' + row.recu + ' (' + this.displayPercentage(row.recu, row.nbOfMsg) + ')'  + '</font>'
        + '<br/> Total messages : <font color="#00bfff">' + row.nbOfMsg + '</font>'
      return txt
    },
    hoverTextFormatterForActivityOverTheDaySMS (index, options, content, row) {
      let txt = '<b>' +  row.hour + ' h </b>'
        + '<br/> Messages émits : <font color="#00bfff">' + row.emit + ' (' + this.displayPercentage(row.emit, row.nb) + ')'  +  '</font>'
        + '<br/> Messages reçus : <font color="#00bfff">' + row.recu + ' (' + this.displayPercentage(row.recu, row.nb) + ')'  + '</font>'
        + '<br/> Total messages : <font color="#00bfff">' + row.nb + '</font>'
      return txt
    },
    hoverTextFormatterForActivityOverTimeSMS (index, options, content, row) {
      let txt = '<b>' +  Diver.dateFormatter('#DDD# #DD# #MMMM# #YYYY#', row.day) + ' </b>'
        + '<br/> Messages émits : <font color="#00bfff">' + row.emit + ' (' + this.displayPercentage(row.emit, row.nb) + ')'  +  '</font>'
        + '<br/> Messages reçus : <font color="#00bfff">' + row.recu + ' (' + this.displayPercentage(row.recu, row.nb) + ')'  + '</font>'
        + '<br/> Total messages : <font color="#00bfff">' + row.nb + '</font>'
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
