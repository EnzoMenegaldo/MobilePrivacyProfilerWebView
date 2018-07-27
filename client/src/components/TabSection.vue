<template>
  <container>
    <b-row align-v="center" align-h="center">
      <b-col></b-col>
      <b-col></b-col>
      <nav class="nav" v-if="tabActive !== ''">
        <div class="nav__item">
          <a href="javascript:void(0)"
             @click="changeActiveTab('HelloWorld')"
             class="nav__link nav__link--left" :class="{'nav__link--active': activeTab == 'HelloWorld'}">
            <i class="fa fa-home" aria-hidden="true"></i> Accueil
          </a>
        </div>
        <div class="nav__item">
          <a href="javascript:void(0)"
             @click="changeActiveTab('SelectUser')"
             class="nav__link" :class="{'nav__link--active': activeTab == 'SelectUser'}">
            <i class="fa fa-users" aria-hidden="true"></i> Sélection de l'utilisateur
          </a>
        </div>
        <div class="nav__item">
          <a href="javascript:void(0)"
             @click="changeActiveTab('Data1')"
             class="nav__link" :class="{'nav__link--active': activeTab == 'Data1'}">
            <i class="fa fa-bar-chart" aria-hidden="true"></i> Page 1
          </a>
        </div>
        <div class="nav__item">
          <a href="javascript:void(0)"
             @click="changeActiveTab('Data2')"
             class="nav__link nav__link--right" :class="{'nav__link--active': activeTab == 'Data2'}">
            <i class="fa fa-pie-chart" aria-hidden="true"></i> Page 2
          </a>
        </div>
      </nav>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
  </container>
</template>

<script>

export default {
  name: 'TabSection',
  props: ['activeTab'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    changeActiveTab: function (tabName) {
      this.$store.commit('setActiveTab', tabName)
      if (tabName === 'HelloWorld') {
        this.$router.push('/')
      } else this.$router.push('/' + tabName)
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav{
    text-align: center;
    margin-top: 10px;
  &__item{
     display: inline-block;
     margin: 0;
     padding: 0;
   }
  &__link{
     position: relative;
     display: block;
     color: #000;
     text-transform: uppercase;
     text-decoration: none;
     padding: 10px;
     background-color: #194bfa;
     color: #fff;
     font-size: 14px;
     font-weight: 200;
  &--active{
     background-color: darken(#194bfa, 10%);
     font-weight: bold;
   }
  &--left{
     border-bottom-left-radius: .5em;
     border-top-left-radius: .5em;
   }
  &--right{
     border-bottom-right-radius: .5em;
     border-top-right-radius: .5em;
   }
  }
  }
</style>
