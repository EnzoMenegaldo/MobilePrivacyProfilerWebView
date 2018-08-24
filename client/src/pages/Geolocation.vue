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
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Date : </b-col></b-row>
          <b-row ><b-col class="statsCell">- Survol : {{displayedMarker.date}}</b-col></b-row>
        </container>
      </b-col>
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Latitude : </b-col></b-row>
          <b-row ><b-col class="statsCell">- Survol : {{displayedMarker.position.lat}}</b-col></b-row>
        </container>
      </b-col>
      <b-col>
        <container>
          <b-row><b-col class="titleStatsCell">Longitude : </b-col></b-row>
          <b-row ><b-col class="statsCell">- Survol : {{displayedMarker.position.lng}}</b-col></b-row>
        </container>
      </b-col>
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
          <l-marker v-for="marker in markers"
                    v-bind:key="marker.date"
                      :draggable="marker.draggable"
                      :lat-lng="marker.position"
                      @mouseout="resetMarkerDate"
                      @mouseover="displayMarkerDate(marker)"
          />
        </l-map>
      </b-clo>
    </b-row>
  </container>
</template>

<script>
/* global L */
/* eslint no-undef: "error" */

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
    LMarker
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
        { position: L.latLng(47.413220, -1.219482), date: 'Marker 1', draggable: true },
        { position: L.latLng(47.313220, -1.219482), date: 'Marker 2', draggable: false }
      ],
      displayedMarker: { position: L.latLng(0, 0), date: 'Na', draggable: false },
      blankMarker: { position: L.latLng(0, 0), date: 'Na', draggable: false },
      popupTarget: null,
      traqueur: 0,
      traqueur2: 0,
      traqueur3: 0,
      traqueur4: 0
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    resize () {
      window.dispatchEvent(new Event('resize'))
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
