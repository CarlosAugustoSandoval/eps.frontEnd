export default {
    path: '/',
    redirect: {name: 'PrescripcionesIndex'},
    component: () => import('@/layouts/full-layout/Layout'),
    children: [
        {
            name: 'Prescripciones',
            path: 'prescripciones',
            component: () => import('@/modules/mipres/views/prescripciones/Prescripciones'),
            meta: {
                requiresAuth: true,
                title: {
                    text: 'Prescripciones',
                    icon: 'fas fa-edit',
                    color: 'light-blue',
                    breadcrumbs: [
                        {
                            text: 'Prescripciones',
                            disabled: true
                        }
                    ]
                }
            }
        },
    ]
}