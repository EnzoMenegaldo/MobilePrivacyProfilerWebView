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
    <b-row class="row" align-h="around" align-v="center">
      <b-col cols="4">
        <img src=".././assets/logo-sms.png" height="200px"/>
      </b-col>
      <b-col cols="6">
        <div class="chartTitle">Statistiques des appels :</div>
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
    }
  },
  methods: {
    async getCallLogsStats (activeUser) {
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
