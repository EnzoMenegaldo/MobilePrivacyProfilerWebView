<template>
<container >
  <b-row class="activeUserBand" align-h="center" >
    <b-col offset="auto" cols="auto" class="txt-left"><div >Utilisateur actif :</div></b-col>
    <b-col sticky cols="auto" class="txt-right"><div >{{activeUser}}</div></b-col>
  </b-row>
  <b-row align-h="center" >
    <b-col class="title"><div>Page 1</div></b-col>
  </b-row>
  <b-row align-h="center" >
    <b-col class="span" cols="5"><router-link to="/bluetooth"><img src=".././assets/logo-bluetooth.png" height="150px"/></router-link></b-col>
    <b-col class="span" cols="5"><router-link to="/battery"><img src=".././assets/logo-battery.png" height="150px"></router-link></b-col>
  </b-row>
  <b-row align-h="center" >
    <b-col class="span" cols="5"><img src=".././assets/logo-sms.png" height="150px"></b-col>
    <b-col class="span" cols="5"><img src="../assets/logo-phone.png" height="150px"></b-col>
  </b-row>
</container>
</template>

<script>
import BluetoothCharts from './BluetoothCharts'
export default {
  name: 'Data1',
  components: {BluetoothCharts},
  computed: {
    activeUser () {
      return this.$store.state.activeUser
    }
  }
}
</script>

<style scoped>
.activeUserBand{
  margin: 40px;
}
.title
{
  height: 40px;
  padding: 15px;
  margin: 10px;

  font-size: 18px;
  font-weight: 900;
  color: #194bfa;
}
.span{
  border-width: 1.5px;
  border-style: solid;
  border-color: #5a6268;
  padding: 15px;
  margin: 10px;
}
.txt-left{
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
  border-bottom-left-radius: .5em;
  border-top-left-radius: .5em;
  margin-right: 0;
}
.txt-right{
  display: block;
  color: #000;
  text-transform: uppercase;
  text-decoration: none;
  padding: 10px;
  background-color: #194bfa;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  border-bottom-right-radius: .5em;
  border-top-right-radius: .5em;
  margin-left: 0;
}
</style>
