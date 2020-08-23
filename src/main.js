import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import Vuebar from 'vuebar'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './plugins/base'
import './plugins/veeValidate'
import VueSkycons from 'vue-skycons'
const optionsSweetalert2 = {
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 6000
}
Vue.use(VueAxios, axios)
Vue.use(VueSkycons, {
    color: '#1e88e5'
})
Vue.use(VueSweetalert2, optionsSweetalert2)
Vue.config.productionTip = false
Vue.use(Vuebar)

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
