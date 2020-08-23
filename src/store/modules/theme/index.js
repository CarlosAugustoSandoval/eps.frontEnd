// state
const state = {
    darkMode: false,
    themeColor: '#1e88e5',
    themeColors: [
        '#1e88e6',
        '#21c1d6',
        '#fc4b6c',
        '#563dea',
        '#9C27b0',
        '#ff9800'
    ]
}

// getters
const getters = {
    themeColors: state => {
        return state.themeColors
    },
    themeColor: state => {
        return state.themeColor
    },
    darkMode: state => {
        return state.darkMode
    }
}

// actions
const actions = {
}

// mutations
const mutations = {
    SET_THEME_MODE(state, dark) {
        state.darkMode = dark
    },
    SET_THEME_COLOR(state, color) {
        state.themeColor = color
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
