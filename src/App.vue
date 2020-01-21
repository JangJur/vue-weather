<template>
  <div id="app">
    <LocationWeather />
  </div>
</template>

<script>
import LocationWeather from "./components/LocationWeather";

export default {
  name: "App",
  components: {
    LocationWeather
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
