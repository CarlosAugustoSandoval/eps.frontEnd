export default {
    path: '/',
    redirect: {name: 'Reportes'},
    component: () => import('@/layouts/full-layout/Layout'),
    children: [
        {
            name: 'Reportes',
            path: 'reportes',
            component: () => import('@/modules/reportes/views/Reportes'),
            meta: {
                requiresAuth: true,
                title: {
                    text: 'Reportes',
                    icon: 'mdi-file-table',
                    color: 'green',
                    breadcrumbs: [
                        {
                            text: 'Reportes',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}