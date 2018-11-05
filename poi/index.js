import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import iview from 'iview';
import vueWaterfallEasy from './components/vue-waterfall-easy.vue'
import uploader from 'vue-simple-uploader'

const {Button, Modal, BackTop, Tag, Input,Affix, Card} = iview

const Plugins = {
    uploader
}

const Components = {
    vueWaterfallEasy,
    Button, Modal, BackTop, Tag, Input,Affix, Card
}

for (let [key, value] of Object.entries(Components)) {
    Vue.component(key, value)
}
for (let [key, value] of Object.entries(Plugins)) {
    Vue.use(value)
}

if(process.env.NODE_ENV=="dev"){
    window._store = store
}


Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: {
        App
    },
    router,
    store,
    render: h => h(App)
}).$mount('#app')