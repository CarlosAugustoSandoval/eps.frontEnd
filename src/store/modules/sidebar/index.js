// state
const state = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: 'white',
    SidebarBg: ''
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
    SET_SIDEBAR_DRAWER(state, payload) {
        state.Sidebar_drawer = payload
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
        state.Customizer_drawer = payload
    },
    SET_SIDEBAR_COLOR(state, payload) {
        state.SidebarColor = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
