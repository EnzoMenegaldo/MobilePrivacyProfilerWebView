<template>
  <div class="VueApp grid__row" id="app">
    <header-section/>

    <tab-section v-bind:activeTab = "activeTab" />

    <div class="main">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue'
import TabSection from '@/components/TabSection.vue'
import store from '../store'

export default {
  name: 'App',
  store,
  components: {
    HeaderSection,
    TabSection
  },
  computed: {
    activeTab () {
      return store.state.activeTab
    }
  },
  created () {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
