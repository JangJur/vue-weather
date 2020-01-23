import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import category from "../json/category.json";

Vue.use(Vuex);

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);
};

export const store = new Vuex.Store({
    state: {
        serviceKey:
            "yourServiceKey",
        today: new Date().yyyymmdd(),
        arrayTop: [],
        arrayMdl: [],
        arrayLeaf: [],
        disabledMdl: true,
        disabledLeaf: true,
        disabledBtn: true,
        res_x: "",
        res_y: "",
        selectTime: "",
        rowItems: [],
        items: []
    },
    mutations: {
        doTopLocationLoad: function (state) {
            axios({
                method: "get",
                url:
                    "https://cors-anywhere.herokuapp.com/http://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt",
                responseType: "json"
            })
                .then(function (response) {
                    state.arrayTop = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        doMdlLocationLoad: function (state, payload) {
            axios({
                method: "get",
                url:
                    "https://cors-anywhere.herokuapp.com/http://www.kma.go.kr/DFSROOT/POINT/DATA/mdl." +
                    payload +
                    ".json.txt",
                responseType: "json"
            })
                .then(function (response) {
                    state.arrayMdl = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    state.disabledMdl = false;
                });
        },
        doLeafLocationLoad: function (state, payload) {
            axios({
                method: "get",
                url:
                    "https://cors-anywhere.herokuapp.com/http://www.kma.go.kr/DFSROOT/POINT/DATA/leaf." +
                    payload +
                    ".json.txt",
                responseType: "json"
            })
                .then(function (response) {
                    state.arrayLeaf = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    state.disabledLeaf = false;
                });
        },
        doLocationWeatherLoad: function (state) {
            axios
                .get(
                    "https://cors-anywhere.herokuapp.com/http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData",
                    {
                        params: {
                            serviceKey: state.serviceKey,
                            base_date: state.today,
                            base_time: state.selectTime,
                            nx: state.res_x,
                            ny: state.res_y,
                            numOfRows: "44",
                            pageNo: "1",
                            _type: "json"
                        }
                    }
                )
                .then(function (response) {
                    state.rowItems = response.data.response.body.items.item;
                })
                .catch(function (err) {
                    console.log(err);
                })
                .then(function () {
                    for (var key in state.rowItems) {
                        state.rowItems[key].category = category[state.rowItems[key].category];
                    }

                    state.items = state.rowItems;
                });
        }
    }
})