import Vue from 'vue'
import Soda from 'soda-js'

// state
const state = {
    cups: [],
    complementarios: [],
    nutricionales: [],
    dispositivos: [],
    prestadores: [],
    departamentos: [],
    causasnoentrega: []
}

// getters
const getters = {
    cups: (state) => {
        return state.cups
    },
    complementarios: (state) => {
        return state.complementarios
    },
    nutricionales: (state) => {
        return state.nutricionales
    },
    dispositivos: (state) => {
        return state.dispositivos
    },
    prestadores: (state) => {
        return state.prestadores
    },
    departamentos: (state) => {
        return state.departamentos
    },
    causasnoentrega: (state) => {
        return state.causasnoentrega
    }
}

// actions
const actions = {
    async getCUMs(context, parametro) {
        let param = !parametro ? this.searchCUM.split('-') : parametro.split('-')
        let cums1 = await new Promise((resolve1, reject1) => {
            context.dispatch('apiCums', {param: param, resource: 'i7cb-raxc'}).then(result => resolve1(result)).catch(e => reject1(e))
        })
        let cums2 = await new Promise((resolve2, reject2) => {
            context.dispatch('apiCums', {param: param, resource: 'vgr4-gemg'}).then(result => resolve2(result)).catch(e => reject2(e))
        })
        console.log('el cums2', cums2)
        let rowsTotal = cums1.concat(cums2).sort((a, b) => a.expediente - b.expediente).sort((a, b) => a.consecutivocum - b.consecutivocum)
        return (param[1] ? rowsTotal.filter(x => x.consecutivocum.search(param[1]) !== -1) : rowsTotal)
    },
    apiCums (context, params) {
        return new Promise((resolve, reject) => {
            let urlComplement = isNaN(Number(params.param[0])) ? `descripcioncomercial like "%${params.param[0].toUpperCase()}%" OR principioactivo like "%${params.param[0].toUpperCase()}%"` : `expediente = ${params.param[0]}`
            const config = {
                hostDomain: 'datos.gov.co',
                resource: params.resource
            }
            const api = new Soda.Consumer(config.hostDomain)
            api.query()
                .withDataset(config.resource)
                .limit(50)
                .where(urlComplement)
                .getRows()
                .on('success', (rows) => {
                    resolve(rows)
                })
                .on('error', (error) => {
                    reject(error)
                })
        })
    },
    async getPrescripcionMipres (context, data) {
        console.log('data', data)
        return await new Promise(resolve => {
            Vue.axios.get(`mipres/prescripciones-mipres/${data.NoPrescripcion}?sync_all=${data.sync ? 1 : 0}`)
                .then(response => {
                    console.log('laprescripciones', response.data)
                    resolve(response.data)
                })
                .catch(e => {
                    resolve(null)
                    console.log('eeeee', e.response.data)
                    Vue.swal({
                        icon: 'error',
                        title: `Error al sincronizar la prescripción No. ${data.NoPrescripcion}.`,
                        text: e.response.data ? `Error ${e.response.data.type}, ${e.response.data.message}` : ''
                    })
                })
        })
    },
    async getSuministroMipres (context, data) {
        console.log('data', data)
        return await new Promise(resolve => {
            Vue.axios.get(`mipres/sincronizar-suministro/${data.NoPrescripcion}`)
                .then(response => {
                    resolve(response)
                })
                .catch(e => {
                    resolve(null)
                    Vue.swal({
                        icon: 'error',
                        // title: `Error al sincronizar la prescripción No. ${data.NoPrescripcion}.`,
                        title: `Error de sincronización.`,
                        text: e.response.data ? `Error ${e.response.data.type}, ${e.response.data.message}` : ''
                    })
                })
        })
    },
    async getPrescripcion (context, NoPrescripcion) {
        return await new Promise(resolve => {
            Vue.axios.get(`mipres/prescripciones/${NoPrescripcion}`)
                .then(response => {
                    response.data.afiliado = null
                    response.data.nombre_completo = [response.data.PAPaciente, response.data.SAPaciente, response.data.PNPaciente, response.data.SNPaciente].filter(x => x).join(' ')
                    response.data.identificacion_completa = `${response.data.TipoIDPaciente}${response.data.NroIDPaciente}`
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
                    response.data.afiliado = null
                    response.data.nombre_completo = [response.data.PAPaciente, response.data.SAPaciente, response.data.PNPaciente, response.data.SNPaciente].filter(x => x).join(' ')
                    response.data.identificacion_completa = `${response.data.TipoIDPaciente}${response.data.NroIDPaciente}`
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
    },
    async getComplementosMipres (context) {
        Vue.axios.get(`mipres/complementos`)
            .then(response => {
                context.commit('SET_COMPLEMENTOS', response.data)
            })
            .catch(() => {
                Vue.swal({
                    icon: 'error',
                    title: `Error al recuperar los complementos.`,
                    text: ''
                })
            })
    },
}

// mutations
const mutations = {
    SET_COMPLEMENTOS (state, data) {
        state.cups = data.cups
        state.departamentos = data.departamentos
        state.complementarios = data.productos_complementarios
        state.nutricionales = data.productos_nutricionales
        state.dispositivos = data.tipos_dispositivos
        state.prestadores = data.prestadores
        state.causasnoentrega = data.causasnoentrega
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
