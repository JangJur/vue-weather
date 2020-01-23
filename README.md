# vue-weather

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> ## Recipe
>
> - [x] Make Project
> - [x] Use Component
>   > - KendoUI (https://www.telerik.com/kendo-vue-ui/components/)
> - [x] Make Component
>
>   > - LocationWeatherSearch
>   > - LocationWeatherGrid
>
> - [x] Vuex
> - [x] Axios(use API)
>
>   > - http://www.kma.go.kr/DFSROOT/POINT/DATA/top.json.txt   
>   > - http://www.kma.go.kr/DFSROOT/POINT/DATA/mdl.topCode.json.txt   
>   > - http://www.kma.go.kr/DFSROOT/POINT/DATA/leaf.mdlCode.json.txt   
>   
>   > - http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData   
>   >   - parameter   
>   >     - serviceKey: yourServiceKey   
>   >     - base_date: 조회날짜(오늘)   
>   >     - base_time: 발표시간   
>   >     - nx: x좌표   
>   >     - ny: y좌표   
>   >     - numOfRows: rows 개수   
>   >     - pageNo: 페이지 번호   
>   >     - _type: "json"   
>   >
> - [x] Deploy(Production)

> ## Page
>   > https://jangjur.github.io/vue-weather/
