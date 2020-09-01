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