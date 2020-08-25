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
                    icon: 'fas fa-prescription',
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
        {
            path: 'prescripciones/:NoPrescripcion',
            props: true,
            name: 'Prescripcion',
            component: () => import('@/modules/mipres/views/prescripciones/prescripcion/Prescripcion'),
            meta: {
                requiresAuth: true,
                title: {
                    text: 'Prescripción',
                    icon: 'fas fa-file-prescription',
                    color: 'light-blue',
                    breadcrumbs: [
                        {
                            text: 'Prescripciones',
                            disabled: false,
                            routerName: 'Prescripciones'
                        },
                        {
                            text: 'Prescripción',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}