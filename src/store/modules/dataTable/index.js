// state
const state = {
    tables: {
        tablaPrescripciones: 0,
        tablaPrescripcionesVersion: 2,
        tablaTutelas: 0,
        tablaTutelasVersion: 1,
        tablaUsuarios: 0,
        tablaUsuariosVersion: 1,
        tablaPrestadores: 0,
        tablaPrestadoresVersion: 1,
        tablaSuministros: 0,
        tablaSuministrosVersion: 1
    }
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    reloadTable(state, table) {
        state.tables[table] = state.tables[table] + 1
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
