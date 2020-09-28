import Vue from 'vue'
// state
const state = {
    access_token: null,
    expires_at: null,
    token_type: null,
    user: null
}

// getters
const getters = {
    user: state => {
        return state.user && state.user.user
    },
    permisos: state => {
        return state.user && state.user.user_permissions
    },
    permisoName: state => name => {
        return state.user && state.user.user_permissions && !!state.user.user_permissions.find(x => x === name)
    }
}

// actions
const actions = {
    async login (context, user) {
        return await new Promise(resolve => {
            Vue.axios.post('auth/login', user)
                .then(response => {
                    context.commit('SET_DATA_AUTH', response.data)
                    context.commit('SET_TOKEN_AXIOS')
                    resolve(true)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: 'Error al iniciar sesión.',
                        text: ''
                    })
                    resolve(false)
                })
        })
    },
    async getUser (context) {
        return await new Promise(resolve => {
            Vue.axios.get('auth/user')
                .then(responseUser => {
                    context.commit('SET_USER', responseUser.data)
                    resolve(true)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: 'Error al recuperar el usuario actual.',
                        text: ''
                    })
                    // context.commit('SET_SNACKBAR', {color: 'error', message: `al recuperar el usuario actual.`, error: error})
                    resolve(false)
                })
        })
    },
    async logout (context) {
        return await new Promise(resolve => {
            Vue.axios.get('auth/logout')
                .then(() => {
                    context.commit('SET_LOGOUT')
                    resolve(true)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: 'Error al cerrar sesión.',
                        text: ''
                    })
                    resolve(false)
                })
        })
    }
}

// mutations
const mutations = {
    SET_DATA_AUTH (state, data) {
        state.token_type = data.token_type
        state.access_token = data.access_token
        state.expires_at = data.expires_at
    },
    SET_DEFAULT_AXIOS () {
        // Vue.axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000/api`
        Vue.axios.defaults.baseURL = `https://api.epstools.app/api`
    },
    SET_TOKEN_AXIOS (state) {
        Vue.axios.defaults.headers.common['Authorization'] = `${state.token_type} ${state.access_token}`
    },
    SET_LOGOUT (state) {
        state.token_type = null
        state.access_token = null
        state.expires_at = null
        state.user = null
        Vue.axios.defaults.headers.common['Authorization'] = null
    },
    SET_USER (state, data) {
        state.user = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
