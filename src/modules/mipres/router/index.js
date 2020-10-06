const Prescripciones = () => import('@/modules/mipres/views/prescripciones/Prescripciones')
const Prescripcion = () => import('@/modules/mipres/views/prescripciones/prescripcion/Prescripcion')
const Tutelas = () => import('@/modules/mipres/views/tutelas/Tutelas')
const Tutela = () => import('@/modules/mipres/views/tutelas/tutela/Tutela')
const Prestadores = () => import('@/modules/mipres/views/prestadores/Prestadores')
const Suministros = () => import('@/modules/mipres/views/suministros/Suministros')
const ConfiguracionesMipres = () => import('@/modules/mipres/views/configuraciones/Configuraciones')
export default {
    path: '/',
    redirect: {name: 'Prescripciones'},
    component: () => import('@/layouts/full-layout/Layout'),
    children: [
        {
            name: 'Prescripciones',
            path: 'prescripciones',
            component: Prescripciones,
            meta: {
                requiresAuth: true,
                withAccess: 'prescripciones.inicio',
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
            component: Prescripcion,
            meta: {
                requiresAuth: true,
                withAccess: 'prescripciones.ver',
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
            component: Tutelas,
            meta: {
                requiresAuth: true,
                withAccess: 'tutelas.inicio',
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
            component: Tutela,
            meta: {
                requiresAuth: true,
                withAccess: 'tutelas.ver',
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
        },
        {
            name: 'Prestadores',
            path: 'prestadores',
            component: Prestadores,
            meta: {
                requiresAuth: true,
                withAccess: 'prestadores.inicio',
                title: {
                    text: 'Prestadores',
                    icon: 'fas fa-user-tie',
                    color: 'deep-purple',
                    breadcrumbs: [
                        {
                            text: 'Prestadores',
                            disabled: true
                        }
                    ]
                }
            }
        },
        {
            name: 'Suministros',
            path: 'suministros',
            component: Suministros,
            meta: {
                requiresAuth: true,
                withAccess: 'suministros.inicio',
                title: {
                    text: 'Suministros',
                    icon: 'fas fa-cubes',
                    color: 'light-green',
                    breadcrumbs: [
                        {
                            text: 'Suministros',
                            disabled: true
                        }
                    ]
                }
            }
        },
        {
            name: 'ConfiguracionesMipres',
            path: 'configuraciones-mipres',
            component: ConfiguracionesMipres,
            meta: {
                requiresAuth: true,
                withAccess: 'configuraciones-mipres.inicio',
                title: {
                    text: 'Configuraciones',
                    icon: 'mdi-cogs',
                    color: 'red',
                    breadcrumbs: [
                        {
                            text: 'Configuraciones MIPRES',
                            disabled: true
                        }
                    ]
                }
            }
        }
    ]
}