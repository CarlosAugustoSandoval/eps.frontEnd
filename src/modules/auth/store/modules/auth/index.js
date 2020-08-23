import Vue from 'vue'
// state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
    logIn (context, user) {
        console.log('context', context)
        console.log('user', user)
        Vue.swal({
            icon: 'error',
            title: 'Error al iniciar sesión.',
            text: 'un texto de error'
        })
    }
}

// mutations
const mutations = {
}

export default {
    state,
    getters,
    actions,
    mutations
}
