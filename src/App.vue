<template>
  <div id="app">
    <LocationWeatherSearch />
    <LocationWeatherGrid />
  </div>
</template>

<script>
import LocationWeatherSearch from "./components/LocationWeatherSearch";
import LocationWeatherGrid from "./components/LocationWeatherGrid";

export default {
  name: "App",
  components: {
    LocationWeatherSearch,
    LocationWeatherGrid
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
