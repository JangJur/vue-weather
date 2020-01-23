<template>
  <div class="buttonArea">
    <div>
      <kendo-dropdownlist
        id="locationTop"
        :data-source="$store.state.arrayTop"
        :dataTextField="'value'"
        :dataValueField="'code'"
        @select="doSelectTop"
      ></kendo-dropdownlist>
      <kendo-dropdownlist
        id="locationMdl"
        :dataSource="$store.state.arrayMdl"
        :dataTextField="'value'"
        :dataValueField="'code'"
        @select="doSelectMdl"
        :disabled="$store.state.disabledMdl"
      ></kendo-dropdownlist>
      <kendo-dropdownlist
        id="locationLeaf"
        :dataSource="$store.state.arrayLeaf"
        :dataTextField="'value'"
        :dataValueField="'code'"
        @select="doSelectLeaf"
        :disabled="$store.state.disabledLeaf"
      ></kendo-dropdownlist>
      <kendo-dropdownlist
        id="locationTime"
        :dataSource="arrayTime"
        :dataTextField="'value'"
        :dataValueField="'key'"
        @select="doSelectTime"
      ></kendo-dropdownlist>
      <kendo-button @click="$store.commit('doLocationWeatherLoad')" :disabled="$store.state.disabledBtn">
        <i class="fa fa-lg fa-search"></i>
      </kendo-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import locationTime from "../json/locationTime.json";

export default {
  name: "LocationWeather",

  data() {
    return {
      arrayTime: locationTime
    };
  },

  mounted() {
    this.$store.commit("doTopLocationLoad");
    this.$store.state.selectTime = this.arrayTime[0].key;
  },

  methods: {
    doSelectTop(event) {
      this.$store.state.arrayLeaf = [];
      this.$store.commit("doMdlLocationLoad", event.dataItem.code);
    },
    doSelectMdl(event) {
      this.$store.commit("doLeafLocationLoad", event.dataItem.code);
    },
    doSelectLeaf(event) {
      this.$store.state.res_x = event.dataItem.x;
      this.$store.state.res_y = event.dataItem.y;
      this.$store.state.disabledBtn = false;
    },
    doSelectTime(event) {
      this.$store.state.selectTime = event.dataItem.key;
    }
  }
};
</script>

<style></style>
