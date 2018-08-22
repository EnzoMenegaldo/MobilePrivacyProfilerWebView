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
        <div>Traqueur : {{traqueur}}</div>
        <div>Traqueur2 : {{traqueur2}}</div>
        <div>Traqueur3 : {{traqueur3}}</div>
        <div>Traqueur4 : {{traqueur4}}</div>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-col cols="auto"><div>Début :</div><date-picker v-model="cursorStart" lang="fr" :not-before="firstDate" :not-after="cursorEnd" confirm></date-picker></b-col>
      <b-col cols="auto"><div>Fin :</div><date-picker v-model="cursorEnd" lang="fr" :not-before="cursorStart" :not-after="lastDate" confirm></date-picker></b-col>
    </b-row>
    <b-row class="row" align-h="around" align-v="center">
      <b-col cols="4">
        <img src=".././assets/logo-sms.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <div class="chartTitle">Statistiques :</div>
        <container>
          <b-row class="statsCell"><b-col>Temps total d'appel : </b-col></b-row>
          <b-row class="statsCell"><b-col>Nombre total d'appel : </b-col></b-row>
          <b-row align-h="start">
            <b-col>
              <container>
                <b-row><b-col class="titleStatsCell">Pourcentage d'appel : </b-col></b-row>
                <b-row ><b-col class="statsCell">- émit : </b-col></b-row>
                <b-row ><b-col class="statsCell">- reçu : </b-col></b-row>
                <b-row ><b-col class="statsCell">- manqué : </b-col></b-row>
              </container>
            </b-col>
            <b-col>
              <container>
                <b-row class="titleStatsCell"><b-col>Temps moyen des appels :</b-col></b-row>
                <b-row ><b-col class="statsCell">- reçus : </b-col></b-row>
                <b-row ><b-col class="statsCell">- émis : </b-col></b-row>
                <b-row ><b-col class="statsCell">.</b-col></b-row>
              </container>
            </b-col>
          </b-row>
          <b-row><b-col class="titleStatsCell">Quartiles : </b-col></b-row>
          <b-row><b-col class="statsCell">Min : </b-col><b-col class="statsCell">Q1 : </b-col></b-row>
          <b-row><b-col class="statsCell">Médiane : </b-col></b-row>
          <b-row><b-col class="statsCell">Q3 : </b-col><b-col class="statsCell">Max : </b-col></b-row>
        </container>
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
      firstDate: 14,
      cursorStart: 14,
      cursorEnd: 86400014,
      lastDate: 86400014,
      traqueur: 0,
      traqueur2: 0,
      traqueur3: 0,
      traqueur4: 0
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
    },
    cursorEnd: function () {

    },
    activeUser: async function () {
      this.fetchAndProcessSMSData()
    },
    SMSs: function () {
      this.cursorStart = this.firstDate
      this.cursorEnd = this.lastDate
    }
  },
  methods: {
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
