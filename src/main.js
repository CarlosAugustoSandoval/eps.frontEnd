import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
import vuetify from './plugins/vuetify'
import store from './store/store'
import router from './router'
import Vuebar from 'vuebar'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './plugins/base'
import './plugins/veeValidate'
import './plugins/mixin'
import VueSkycons from 'vue-skycons'
import lodash from 'lodash'
import App from './App.vue'
window.lodash = lodash

moment.locale('es')
Vue.prototype.moment = moment

Vue.use(VueAxios, axios)
Vue.use(VueSkycons, {color: '#1e88e5'})
Vue.use(VueSweetalert2, {showConfirmButton: false, timerProgressBar: true, timer: 6000})
Vue.config.productionTip = false
Vue.use(Vuebar)

store.commit('SET_DEFAULT_AXIOS')
store.commit('SET_TOKEN_AXIOS')
axios.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
        store.commit('SET_LOGOUT')
        Vue.swal({
            icon: 'warning',
            title: 'Sesión Expirada',
            text: 'Los datos de la sesión han expirado, inicie sesión nuevamente.'
        })
        router.replace({name: 'Login'})
    }
    return Promise.reject(error)
})

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
