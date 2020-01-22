import Vue from 'vue'
import App from './App'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Button, ButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
import { ComboBox, DropdownsInstaller } from '@progress/kendo-dropdowns-vue-wrapper'
import { Grid } from '@progress/kendo-vue-grid';

Vue.config.productionTip = false

Vue.use(ButtonsInstaller);
Vue.use(DropdownsInstaller);
Vue.component('Grid', Grid);

new Vue({
  el: '#app',
  components: {
    Button
  },
  render: h => h(App)
})
