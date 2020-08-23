import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import sidebar from './modules/sidebar'
import menu from './modules/menu'
import theme from './modules/theme'
import dataTable from './modules/dataTable'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme,
        sidebar,
        menu,
        dataTable
    },
    plugins: [createPersistedState({
        paths: ['theme']
    })]
})
