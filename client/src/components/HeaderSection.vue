<template>
  <header class="header">
    <div class="header__sticky">
      <div class="header__content">
        <router-link to="/">
          <img src=".././assets/logo.png">
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
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
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
