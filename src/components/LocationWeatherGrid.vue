<template>
  <Grid
    id="grid1"
    :style="{
      'margin-top': '1%',
      height: '750px',
      width: '50%',
      'margin-left': 'auto',
      'margin-right': 'auto'
    }"
    :data-items="$store.state.items"
    :columns="columns"
  >
  </Grid>
</template>

<script>
export default {
  name: "LocationWeatherGrid",

  data() {
    return {
      columns: [
        { field: "fcstDate", title: "예보시각의 날짜" },
        { field: "fcstTime", title: "예보시각의 시분" },
        { field: "category", title: "데이터 종류" },
        { field: "fcstValue", title: "예보값" }
      ]
    };
  },
}
</script>

<style</style>
