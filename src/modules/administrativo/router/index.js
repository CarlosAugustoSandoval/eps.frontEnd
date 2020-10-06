const Administrativo = () => import('@/modules/administrativo/views/Administrativo')

export default {
    path: '/',
    redirect: {name: 'Administrativo'},
    component: () => import('@/layouts/full-layout/Layout'),
    children: [
        {
            name: 'Administrativo',
            path: 'administrativo',
            component: Administrativo,
            meta: {
                requiresAuth: true,
                withAccess: 'administrativo.inicio',
                title: {
                    text: 'Administrativo',
                    icon: 'fas fa-user-cog',
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