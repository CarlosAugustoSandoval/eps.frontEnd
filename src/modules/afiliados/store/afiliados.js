import Vue from 'vue'

// state
const state = {
    afiliados: []
}

// getters
const getters = {
    afiliados: (state) => {
        return state.afiliados
    }
}

// actions
const actions = {
    async getAfiliadoIdentificacion (context, data) {
        return await new Promise(resolve => {
            Vue.axios.get(`afiliados/${data.identificacion}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: `Error al recuperar los datos del afiliado con identificación ${data.NoPrescripcion}.`,
                        text: ''
                    })
                    resolve(null)
                })
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
