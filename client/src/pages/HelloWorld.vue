<template>
  <div class="hello">
    <div class="spacer"></div>
    <div class="spacer"></div>
    <h1>{{ msg }}</h1>
    <h2>Application web de consultation des données de l'étude Mobile Privacy Profiler</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Bienvenue sur Mobile Privacy Profiler Webview'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.spacer
{
  height: 40px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
