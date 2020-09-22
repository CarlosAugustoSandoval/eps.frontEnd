import { itemsMenu } from './data'
// state
const state = {
    itemsMenu
}

// getters
const getters = {
    itemsMenu: (state) => {
        let menuPrincipal = []
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 1))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 2))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 3))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 8))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 6))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 7))
        menuPrincipal.push(state.itemsMenu.find(x => x.id === 9))
        return menuPrincipal
    }
}

// actions
const actions = {
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
