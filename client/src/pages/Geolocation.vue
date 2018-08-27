<template>
  <container v-on:mouseover="resize()">
    <b-row class="firstRow" align-h="center">
      <b-clo>
        <router-link to="/Data2"><div class="returnBtn">Retour</div></router-link>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-clo>
        <div class="title">Géolocalisation</div>
        <div>traqueur {{traqueur}}</div>
        <div>traqueur2 {{traqueur2}}</div>
        <div>traqueur3 {{traqueur3}}</div>
        <div>traqueur4 {{traqueur4}}</div>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-clo>
        <l-map :zoom="zoom"
               :center="center"
               :min-zoom="minZoom"
               :max-bounds="maxBounds"
        >
          <l-tile-layer :url="url"
                        :attribution="attribution"
          />
          <marker-popup
            v-for="marker in markers"
            v-bind:key="marker.date"
              :position="marker.position"
              :text="marker.extraText"
              :title="marker.date"
              @mouseout="resetMarkerDate"
              @mouseover="displayMarkerDate(marker)"/>
          <!--
          <l-marker
            v-for="marker in markers"
            v-bind:key="marker.date"
              :draggable="marker.draggable"
              :lat-lng="marker.position"
              @mouseout="resetMarkerDate"
              @mouseover="displayMarkerDate(marker)"
          />
          -->
        </l-map>
      </b-clo>
    </b-row>
    <b-row align-h="center">
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Date : </b-col></b-row>
          <b-row ><b-col class="statsCell">{{dateFormatter(displayedMarker.date)}}</b-col></b-row>
        </container>
      </b-col>
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Latitude : </b-col></b-row>
          <b-row ><b-col class="statsCell">{{displayedMarker.position.lat}}</b-col></b-row>
        </container>
      </b-col>
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Longitude : </b-col></b-row>
          <b-row ><b-col class="statsCell">{{displayedMarker.position.lng}}</b-col></b-row>
        </container>
      </b-col>
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Extra texte : </b-col></b-row>
          <b-row ><b-col class="statsCell">{{displayedMarker.extraText}}</b-col></b-row>
        </container>
      </b-col>
    </b-row>
  </container>
</template>

<script>
/* global L */
/* eslint no-undef: "error" */

import MarkerPopup from '@/components/MarkerPopup'
import Diver from '@/services/Diver'
import FetchService from '@/services/FetchService'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Geolocation',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    MarkerPopup
  },
  data () {
    return {
      minZoom: 3,
      zoom: 6,
      center: L.latLng(47.413220, -1.219482),
      maxBounds: L.latLngBounds([[-85, -215], [85, 215]]),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      markers: [
        { position: L.latLng(47.413220, -1.219482), date: 'Marker 1', extraText: ' ', draggable: true },
        { position: L.latLng(47.313220, -1.219482), date: 'Marker 2', extraText: ' ', draggable: false }
      ],
      displayedMarker: { position: L.latLng(0, 0), date: 'Na', extraText: '.', draggable: false },
      blankMarker: { position: L.latLng(0, 0), date: 'Na', extraText: '.', draggable: false },
      popupTarget: null,
      traqueur: 0,
      traqueur2: 0,
      traqueur3: 0,
      traqueur4: 0,
      firstDate: 14,
      cursorStart: 14,
      cursorEnd: 86400014,
      lastDate: 86400014,
      GPSGeolocationMarkerList: [ { position: L.latLng(0, 0), date: 'Na', extraText: '', draggable: false }
      ],
      WifiGeolocationMarkerList: [ { position: L.latLng(0, 0), date: 'Na', extraText: '', draggable: false }
      ],
      CellGeolocationMarkerList: [ { position: L.latLng(0, 0), date: 'Na', extraText: '', draggable: false }
      ]
    }
  },
  computed: {
    activeUser: function () {
      return this.$store.state.activeUser
    }
  },
  watch: {
    activeUser: async function () {
      this.fetchAndProcessGPSGeolocationData()
    }
  },
  mounted () {
    this.fetchAndProcessGPSGeolocationData()
  },
  methods: {
    resize () {
      window.dispatchEvent(new Event('resize'))
    },
    async fetchAndProcessGPSGeolocationData () {
      const response = await FetchService.fetchGPSGeolocation({ UserId: this.$store.state.activeUser })
      let responseData = response.data
      let dataToDisplay = []
      let firstDate = null
      let lastDate = null
      // for each GPSGeolocation row
      for (let i = 0; i < responseData.length; i++) {
        // prepare item parameter
        let latitude = 0
        let longitude = 0
        let date = -1
        let extraText = ''

        let obj = responseData[i]

        latitude = obj.latitude
        longitude = obj.longitude
        date = Number(obj.date)
        extraText = '<b>' + this.dateFormatter(date) + '</b><br/>' +
          'Latitude : ' + latitude + '</b><br/>' +
          'Longitude : ' + longitude + '</b><br/>' +
          'Précision : ' + obj.precision + ', Altitude : ' + obj.altitude + ' (Précision : ' + obj.verticalPrecision + ')'
        if (firstDate === -1 || date < firstDate) { firstDate = date }
        if (lastDate === -1 || date > lastDate) { lastDate = date }

        dataToDisplay.push(
          { 'position': L.latLng(latitude, longitude),
            'date': date,
            'extraText': extraText,
            'draggable': false }
        )
      } // end forEach GPSGeolocation row

      this.firstDate = Number(firstDate)
      this.cursorStart = Number(firstDate)
      this.lastDate = Number(lastDate)
      this.cursorEnd = Number(lastDate)

      this.GPSGeolocationMarkerList = dataToDisplay
      this.markers = dataToDisplay
    },
    dateFormatter (millisecondDate) {
      if (millisecondDate === 'Na') { return 'Na' }
      return Diver.dateFormatter('#hhh# h #mm# le #DDD# #DD# #MMMM# #YYYY#', millisecondDate)
    },
    displayMarkerDate (marker) {
      this.displayedMarker = marker
    },
    resetMarkerDate () {
      this.displayedMarker = this.blankMarker
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
  .span{
    border: solid;
  }
  .vue2leaflet-map {
    height: 400px;
    width: 800px;
  }
</style>
