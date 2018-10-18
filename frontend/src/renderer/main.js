import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import components from "./components"

import axios from 'axios'
import iView from 'iview';

import Viewer from 'v-viewer'
import vueWaterfallEasy from 'vue-waterfall-easy'
import VueUploadComponent  from "vue-upload-component"


const Plugins = {
  Viewer,
}

const Components = {
  vueWaterfallEasy,
  "file-upload": VueUploadComponent,
  ...components
}

for (let [key, value] of Object.entries(Components)) {
  Vue.component(key, value)
}
for (let [key, value] of Object.entries(Plugins)) {
  Vue.use(value)
}


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')