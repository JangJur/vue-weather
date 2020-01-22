<template>
  <div class="buttonArea">
    <div>
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
      <kendo-dropdownlist
        id="locationTime"
        :dataSource="arrayTime"
        :dataTextField="'value'"
        :dataValueField="'key'"
        @select="doSelectTime"
      ></kendo-dropdownlist>
      <kendo-button
        @click="doLocationWeatherLoad(today)"
        :disabled="disabledBtn"
      >
        <i class="fa fa-lg fa-search"></i>
      </kendo-button>
    </div>
    <div style="">
      <Grid
        id="grid1"
        :style="{
          'margin-top': '1%',
          height: '750px',
          width: '50%',
          'margin-left': 'auto',
          'margin-right': 'auto'
        }"
        :data-items="items"
        :columns="columns"
      >
      </Grid>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import locationTime from "../json/locationTime.json";
import category from "../json/category.json";

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
      arrayTime: locationTime,
      selectTime: "",
      res_x: "",
      res_y: "",
      disabledMdl: true,
      disabledLeaf: true,
      disabledBtn: true,
      items: [],
      columns: [
        { field: "fcstDate", title: "예보시각의 날짜" },
        { field: "fcstTime", title: "예보시각의 시분" },
        { field: "category", title: "데이터 종류" },
        { field: "fcstValue", title: "예보값" }
      ]
    };
  },

  mounted() {
    this.doTopLocationLoad();
    this.selectTime = this.arrayTime[0].key;
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
              base_time: this.selectTime,
              nx: this.res_x,
              ny: this.res_y,
              numOfRows: "44",
              pageNo: "1",
              _type: "json"
            }
          }
        )
        .then(function(response) {
          that.doDataMapping(response.data.response.body.items.item);
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
      this.arrayLeaf = [];
      this.doMdlLocationLoad(event.dataItem.code);
    },
    doSelectMdl(event) {
      this.doLeafLocationLoad(event.dataItem.code);
    },
    doSelectLeaf(event) {
      this.res_x = event.dataItem.x;
      this.res_y = event.dataItem.y;
      this.disabledBtn = false;
    },
    doSelectTime(event) {
      this.selectTime = event.dataItem.key;
    },
    doDataMapping: function(items) {
      for (var key in items) {
        items[key].category = category[0][items[key].category];
      }
      
      this.items = items;
    }
  }
};
</script>

<style></style>
