<template>
  <header class="header">
    <div class="header__sticky">
      <div class="header__content">
        <router-link to="/" >
          <container>
            <b-row  align-v="center">
              <b-col>
                <img src=".././assets/droid-icon.png" height="45px" @click="changeActiveTab()">
              </b-col>
              <b-col>
                <txt class="txt" @click="changeActiveTab()"> Mobile Privacy</txt>
              </b-col>
            </b-row>
          </container>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  modules: [
    'bootstrap-vue/nuxt', { css: false }
  ],
  computed: {
  },
  methods: {
    changeActiveTab: function () {
      this.$store.commit('setActiveTab', 'HelloWorld')
    }
  }
}
</script>
<style type="text/css">
a:link
{
text-decoration:none;
}
</style>
<style lang="scss" scoped>
  .txt {
    color: #fff;
    font-weight: bold;
    font-size: 30px;
  }
  .pointer {
    cursor: pointer;
  }
  .header {
    height: 60px;
    &__sticky {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 10;
      display: table;
      margin: 0;
      height: 60px;
      background: #f05724;
      text-align: center;
      color: #fff;
      width: 100%;
    }
    &__content {
      text-align: center;
      display: table-cell;
      vertical-align: middle;
    }
    &__brand {
      width: auto;
      height: 50px;
    }
    &__nav {
      color: #fff;
      display: table-cell;
      vertical-align: middle;
      &:first-child {
        text-align: left;
        padding-left: 15px;
        width: 50px;
      }
      &:last-child {
        text-align: right;
        padding-right: 15px;
        width: 50px;
      }
    }
    &__hamburger {
      background: none;
      border: none;
      padding: 0;
      outline: none;
      color: #fff;
      font-size: 30px;
    }
    &__search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
