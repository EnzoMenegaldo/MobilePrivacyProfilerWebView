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
        <div>Traqueur : {{traqueur}}</div>
      </b-clo>
    </b-row>
    <b-row class="row" align-h="around" align-v="center">
      <b-col cols="4">
        <img src=".././assets/logo-phone.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <div>Liste des appels :</div>
        <b-list-group class="list-group">
          <b-list-group-item :class="callLog.class" v-for="callLog in callLogs" :key="callLog.date">
            <container>
              <b-row align-v="center" align-h="center">
                <b-col cols="2"><i class="icon" :class="callLog.icon" aria-hidden="true"></i></b-col>
                <b-col cols="9">
                  <container>
                    <b-row align-v="center" align-h="center">
                      <b-col cols="auto"><div class="txtType">{{callLog.phoneNumber}}</div></b-col>
                      <b-col cols="auto"><div class="txtType">{{callLog.name}}</div></b-col>
                    </b-row>
                    <b-row align-v="center" align-h="center">
                      <b-col cols="auto"><div class="txtDate">{{callLog.type}}</div></b-col>
                      <b-col cols="auto"><div class="txtDate">Durée : {{displayDuration(callLog.duration)}}</div></b-col>
                      <b-col cols="auto"><div class="txtDate">{{dateFormatter(callLog.date)}}</div></b-col>
                    </b-row>
                  </container>
                </b-col>
              </b-row>
            </container>
          </b-list-group-item>
        </b-list-group>
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
        {'_id': 0, 'phoneNumber': '1111111111', 'name': 'Titi', 'class': 'group-item-missed', 'icon': 'fa fa-question-circle fa-4x', 'type': 'Manqué', 'duration': 0, 'date': 1501100000000, "_rowVariant": 'danger'},
        {'_id': 1, 'phoneNumber': '2222222222', 'name': 'Toto', 'class': 'group-item-incoming', 'icon': 'fa fa-arrow-circle-down fa-4x', 'type': 'Entrant', 'duration': 61, 'date': 1502200000000, "_rowVariant": 'info'},
        {'_id': 2, 'phoneNumber': '3333333333', 'name': 'Tutu', 'class': 'group-item-outcoming', 'icon': 'fa fa-arrow-circle-up fa-4x', 'type': 'Sortant', 'duration': 4000, 'date': 1503300000000, "_rowVariant": 'success'}
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
          formatter: (value) => { return this.displayDuration(value)}
        },
        {
          key: 'date',
          sortable: true,
          label: 'Date',
          formatter: (value) => { return this.dateFormatter(value)}
        }
      ],
      dummy: '06 10 70 26 31',
      traqueur: 0
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
  components: { BarChart, DatePicker },
  watch: {
    activeUser: async function () {
      const response = await FetchService.fetchLogCalls({ UserId: this.$store.state.activeUser })
      let responseData = response.data
      let dataToDisplay = []
      // for each call log
      for (let i = 0; i < responseData.length; i++) {
        // prepare item parameter
        let _id, phoneNumber, date, _class , icon, type, duration, name, _rowVariant
        let obj = responseData[i]
        _id = obj._id
        phoneNumber = obj.phoneNumber
        date = obj.date
        duration = obj.duration
        switch (obj.callType){
          case 'OUTGOING' :
            _class = 'group-item-outcoming'
            icon = 'fa fa-arrow-circle-up fa-4x'
            type = 'Sortant'
            _rowVariant= 'success'
            break
          case 'INCOMING' :
            _class = 'group-item-incoming'
            icon = 'fa fa-arrow-circle-down fa-4x'
            type = 'Entrant'
            _rowVariant= 'info'
            break
          case 'MISSED' :
            _class = 'group-item-missed'
            icon = 'fa fa-question-circle fa-4x'
            type = 'Manqué'
            _rowVariant= ''
            break
          default:
            _class = ''
            icon = 'fa fa-question-circle fa-4x'
            type = 'Unknown'
            _rowVariant= 'danger'
            break
        }
        name = 'Inconnu'
        // add entry to the list
        dataToDisplay.push(
          {
            '_id': _id,
            'phoneNumber': phoneNumber,
            'name': name,
            'class': _class,
            'icon': icon,
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
          if (refPhoneNumber.length < 5 && (compPhoneNumber == refPhoneNumber)) {
            requestedContact.push(responseNameData[j])
          } else if (refPhoneNumber.length > 5 && compPhoneNumber.includes(refPhoneNumber)) {
            requestedContact.push(responseNameData[j])
          }
        }
        if (requestedContact.length > 0) {
          dataToDisplay[i].name = requestedContact[requestedContact.length-1].displayName
        }
      }
      this.callLogs = dataToDisplay
    }
  },
  methods: {
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
      } else {
        return Diver.dateFormatter('#hhh# h #m# min #s# s', (duration * 1000) + 82800000)
      }
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
  .group-item-missed{
    background-color: lightyellow;
  }
  .group-item-incoming{
    background-color: #42b983;
  }
  .group-item-outcoming{
    background-color: #28a745;
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
