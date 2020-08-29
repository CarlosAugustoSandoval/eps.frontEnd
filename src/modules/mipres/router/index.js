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
            name: 'Prescripcion',
            path: 'prescripciones/:NoPrescripcion',
            props: true,
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
        },
        {
            name: 'Tutelas',
            path: 'tutelas',
            component: () => import('@/modules/mipres/views/tutelas/Tutelas'),
            meta: {
                requiresAuth: true,
                title: {
                    text: 'Tutelas',
                    icon: 'mdi-gavel',
                    color: 'teal',
                    breadcrumbs: [
                        {
                            text: 'Tutelas',
                            disabled: true
                        }
                    ]
                }
            }
        },
        {
            name: 'Tutela',
            path: 'tutelas/:NoTutela',
            props: true,
            component: () => import('@/modules/mipres/views/tutelas/tutela/Tutela'),
            meta: {
                requiresAuth: true,
                title: {
                    text: 'Tutela',
                    icon: 'FileShield',
                    color: 'teal',
                    svg: true,
                    breadcrumbs: [
                        {
                            text: 'Tutelas',
                            disabled: false,
                            routerName: 'Tutelas'
                        },
                        {
                            text: 'Tutela',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}