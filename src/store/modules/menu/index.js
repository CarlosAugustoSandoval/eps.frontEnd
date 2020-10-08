import { itemsMenu } from './data'
// state
const state = {
    itemsMenu
}

// getters
const getters = {
    itemsMenu: (state, getters) => {
        let menuPrincipal = []
        // menuPrincipal.push(state.itemsMenu.find(x => x.id === 1))
        if(getters.permisoName('prescripciones.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 2))
        if(getters.permisoName('tutelas.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 3))
        if(getters.permisoName('suministros.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 8))
        if(getters.permisoName('usuarios.inicio') || getters.permisoName('roles.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 6))
        if(getters.permisoName('prestadores.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 7))
        if(getters.permisoName('reportes.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 9))
        if(getters.permisoName('configuraciones-mipres.inicio')) menuPrincipal.push(state.itemsMenu.find(x => x.id === 10))
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
