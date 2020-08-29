// import Vue from 'vue'
// state
import Vue from "vue";

const state = {
}

// getters
const getters = {
}

// actions
const actions = {
    async getPrescripcion (context, NoPrescripcion) {
        return await new Promise(resolve => {
            Vue.axios.get(`mipres/prescripciones/${NoPrescripcion}`)
                .then(response => {
                    console.log('prescripciones', response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: `Error al recuperar la prescripción No. ${NoPrescripcion}.`,
                        text: ''
                    })
                    resolve(null)
                })
        })
    },
    async getTutela (context, NoTutela) {
        return await new Promise(resolve => {
            Vue.axios.get(`mipres/tutelas/${NoTutela}`)
                .then(response => {
                    console.log('tutelas', response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    Vue.swal({
                        icon: 'error',
                        title: `Error al recuperar la tutela No. ${NoTutela}.`,
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
