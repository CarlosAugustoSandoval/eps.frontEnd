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
        if (state.user && state.user.user_permissions && state.user.user_permissions.length) {
            return state.user.user_permissions.reduce((value, key) => {
                value[key] = value[key] || true
                return value
            }, {})
        }
        return {}
    },
    permisoName: state => name => {
        return state.user && state.user.user_permissions && state.user.user_permissions.length && !!state.user.user_permissions.find(x => x.toString() === name.toString())
    },
    permisosModule: state => modulo => {
        if (state.user && state.user.user_permissions && state.user.user_permissions.length) {
            return state.user.user_permissions.filter(x => x.toString().toLowerCase().indexOf(modulo.toString().toLowerCase()) > -1).map(x => x.split(`${modulo}.`)[1]).reduce((value, key) => {
                value[key] = value[key] || true
                return value
            }, {})
        }
        return {}
    }
}

// actions
const actions = {
    async login(context, user) {
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
    async getUser(context) {
        return await new Promise(resolve => {
            Vue.axios.get('auth/user')
                .then(responseUser => {
                    if (responseUser.data
                        && responseUser.data.user_permissions
                        && responseUser.data.user_permissions.length
                        && (responseUser.data.user_permissions.find(x => x === 'usuarios.inicio')
                            || responseUser.data.user_permissions.find(x => x === 'roles.inicio')
                        )) responseUser.data.user_permissions.push('administrativo.inicio')
                    context.commit('SET_USER', responseUser.data)
                    resolve(true)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: 'Error al recuperar el usuario actual.',
                        text: ''
                    })
                    resolve(false)
                })
        })
    },
    async logout(context) {
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
    SET_DATA_AUTH(state, data) {
        state.token_type = data.token_type
        state.access_token = data.access_token
        state.expires_at = data.expires_at
    },
    SET_DEFAULT_AXIOS() {
        // Vue.axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000/api`
        Vue.axios.defaults.baseURL = `https://api.epstools.app/api`
    },
    SET_TOKEN_AXIOS(state) {
        Vue.axios.defaults.headers.common['Authorization'] = `${state.token_type} ${state.access_token}`
    },
    SET_LOGOUT(state) {
        state.token_type = null
        state.access_token = null
        state.expires_at = null
        state.user = null
        Vue.axios.defaults.headers.common['Authorization'] = null
    },
    SET_USER(state, data) {
        state.user = data
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
