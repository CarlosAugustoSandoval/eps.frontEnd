import store from '../../../store/store'

console.log('storeeeee', store)
export default {
    path: '/',
    redirect: {name: 'Administrativo'},
    component: () => import('@/layouts/full-layout/Layout'),
    children: [
        {
            name: 'Administrativo',
            path: 'adnimistrativo',
            component: () => import('@/modules/administrativo/views/Administrativo'),
            meta: {
                requiresAuth: true,
                withAccess: store.getters.permisoName('usuarios.inicio') || store.getters.permisoName('roles.inicio'),
                title: {
                    text: 'Administrativo',
                    icon: 'fas fa-cog',
                    color: 'orange',
                    breadcrumbs: [
                        {
                            text: 'Administrativo',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}