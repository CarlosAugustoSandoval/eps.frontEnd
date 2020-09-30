const Reportes = () => import('@/modules/reportes/views/Reportes')
export default {
    path: '/',
    redirect: {name: 'Reportes'},
    component: () => import('@/layouts/full-layout/Layout'),
    children: [
        {
            name: 'Reportes',
            path: 'reportes',
            component: Reportes,
            meta: {
                requiresAuth: true,
                withAccess: 'reportes.inicio',
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