<template>
  <div class="button">
    <kendo-dropdownlist
      id="locationTop"
      :data-source="arrayTop"
      :dataTextField="'value'"
      :dataValueField="'code'"
      @select="doSelectTop"
    ></kendo-dropdownlist>
    <kendo-dropdownlist
      id="locationMdl"
      :dataSource="arrayMdl"
      :dataTextField="'value'"
      :dataValueField="'code'"
      @select="doSelectMdl"
      :disabled="disabledMdl"
    ></kendo-dropdownlist>
    <kendo-dropdownlist
      id="locationLeaf"
      :dataSource="arrayLeaf"
      :dataTextField="'value'"
      :dataValueField="'code'"
      @select="doSelectLeaf"
      :disabled="disabledLeaf"
    ></kendo-dropdownlist>
    <kendo-button @click="doLocationWeatherLoad(today)" :disabled="disabledBtn"
      ><i class="fa fa-lg fa-search"></i
    ></kendo-button>
    <div>
      {{ weatherData }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import locationTop from "../json/locationTop.json";

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth() + 1).toString();
  var dd = this.getDate().toString();

  return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);
};

export default {
  name: "LocationWeather",

  data() {
    return {
      serviceKey: "yourServiceKey",
      today: new Date().yyyymmdd(),
      arrayTop: [],
      arrayMdl: [],
      arrayLeaf: [],
      res_x: "",
      res_y: "",
      disabledMdl: true,
      disabledLeaf: true,
      disabledBtn: true,
      weatherData: []
    };
  },

  created() {
    this.doTopLocationLoad();
  },

  methods: {
    doLocationWeatherLoad: function(today) {
      var that = this;
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData",
          {
            params: {
              serviceKey: this.serviceKey,
              base_date: this.today,
              base_time: "0500",
              nx: this.res_x,
              ny: this.res_y,
              numOfRows: "44",
              pageNo: "1",
              _type: "json"
            }
          }
        )
        .then(function(response) {
          console.log("response: ", response.data.response.body.items);
          that.weatherData = response.data.response.body.items;
        })
        .catch(function(err) {
          console.log(err);
        })
        .then(function() {});
    },
    doTopLocationLoad: function() {
      var that = this;
      axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/http://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt",
        responseType: "json"
      })
        .then(function(response) {
          console.log(response);
          that.arrayTop = response.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    doMdlLocationLoad: function(mdlCode) {
      var that = this;
      axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/http://www.kma.go.kr/DFSROOT/POINT/DATA/mdl." +
          mdlCode +
          ".json.txt",
        responseType: "json"
      })
        .then(function(response) {
          that.arrayMdl = response.data;
          console.log(response.data);
        })
        .catch(function(err) {
          console.log(err);
        })
        .then(function() {
          that.disabledMdl = false;
        });
    },
    doLeafLocationLoad: function(leafCode) {
      var that = this;
      axios({
        method: "get",
        url:
          "https://cors-anywhere.herokuapp.com/http://www.kma.go.kr/DFSROOT/POINT/DATA/leaf." +
          leafCode +
          ".json.txt",
        responseType: "json"
      })
        .then(function(response) {
          that.arrayLeaf = response.data;
        })
        .catch(function(err) {
          console.log(err);
        })
        .then(function() {
          that.disabledLeaf = false;
        });
    },
    doSelectTop(event) {
      this.doMdlLocationLoad(event.dataItem.code);
    },
    doSelectMdl(event) {
      this.doLeafLocationLoad(event.dataItem.code);
    },
    doSelectLeaf(event) {
      this.res_x = event.dataItem.x;
      this.res_y = event.dataItem.y;
      this.disabledBtn = false;
    }
  }
};
</script>

<style></style>
