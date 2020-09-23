import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import sidebar from './modules/sidebar'
import menu from './modules/menu'
import theme from './modules/theme'
import dataTable from './modules/dataTable'
import snackbar from './modules/snackbar'
import auth from '../modules/auth/store/auth'
import mipres from '../modules/mipres/store/mipres'
import afiliados from '../modules/afiliados/store/afiliados'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme,
        sidebar,
        menu,
        auth,
        dataTable,
        snackbar,
        mipres,
        afiliados
    },
    plugins: [createPersistedState({
        paths: ['theme', 'auth']
    })]
})
