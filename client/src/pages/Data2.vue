<template>
  <container >
    <b-row class="activeUserBand" align-h="center" >
      <b-col offset="auto" cols="auto" class="txt-left"><div >Utilisateur actif :</div></b-col>
      <b-col sticky cols="auto" class="txt-right"><div >{{activeUser}}</div></b-col>
    </b-row>
    <b-row align-h="center" >
      <b-col class="title"><div>Page 2</div></b-col>
    </b-row>
    <b-row align-h="center" >
      <b-col class="span" cols="5"><router-link to="/geolocation"><img src=".././assets/logo-loc-gps.png" height="150px"></router-link></b-col>
      <b-col class="span" cols="5"><img src=".././assets/logo-loc-cell.png" height="150px"></b-col>
    </b-row>
    <b-row align-h="center" >
      <b-col class="span" cols="5"><img src=".././assets/logo-loc-wifi.png" height="150px"></b-col>
      <b-col class="span" cols="5"><img src=".././assets/logo-loc-gps-2.png" height="150px"></b-col>
    </b-row>
  </container>
</template>

<script>
export default {
  name: 'Data2',
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
