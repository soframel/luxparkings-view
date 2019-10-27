<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">LuxParkings Viewer</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #142c6e;
}
#nav {
  padding: 5px;
}

#nav a {
  font-weight: bold;
  color: #142c6e;
}

#nav a.router-link-exact-active {
  color: #12af12;
}

h1 {
  font-size: larger;
}

.resultMessage{
font-size: large;
font-weight: bold;
}
.resultValue{
  font-size: large;
  color: red;
  font-weight: bold;
}
.resultWarning{
font-size: smaller;
font-style: italic;
}

</style>
