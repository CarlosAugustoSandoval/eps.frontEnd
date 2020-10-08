import Vue from 'vue'
import Router from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import store from '../store/store'
const Prescripciones = () => import('@/modules/mipres/views/prescripciones/Prescripciones')

import mipresRoutes from '@/modules/mipres/router'
import authenticationRoutes from '@/modules/auth/router'
import administrativoRoutes from '@/modules/administrativo/router'
import reportesRoutes from '@/modules/reportes/router'

Vue.use(Router)

// export default new Router({
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    // This is for the scroll top when click on any router link
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0
        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }
        return goTo(scrollTo)
    },
    // This is for the scroll top when click on any router link
    routes: [
        {
            path: '/',
            redirect: { name: 'Home' },
            component: () => import('@/layouts/full-layout/Layout'),
            children: [
                {
                    name: 'Home',
                    path: 'home',
                    component: Prescripciones,
                    meta: {
                        requiresAuth: false,
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
                }
                // {
                //     name: 'Home',
                //     path: 'home',
                //     component: () => import('@/views/Home'),
                //     meta: {
                //         requiresAuth: false,
                //         withAccess: true,
                //         title: {
                //             text: 'Home',
                //             icon: 'mdi-home',
                //             color: 'red',
                //             breadcrumbs: [
                //                 {
                //                     text: 'Inicio',
                //                     disabled: true
                //                 }
                //             ]
                //         }
                //     }
                // },
            ]
        },
        mipresRoutes,
        authenticationRoutes,
        administrativoRoutes,
        reportesRoutes
    ]
})

// navigation guards before each
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state.auth.access_token) {
            next({ name: 'Login' })
        } else if(await store.getters.permisoName(to.meta.withAccess)) {
            next()
        } else {
            setTimeout(() => {
                store.commit('SET_SNACKBAR', {color: 'warning', message: `No tiene permisos para entrar en ${to.meta.title.text}.`})
            }, 200)
            next({ name: 'Home' })
        }
    } else {
        next()
    }
})

export default router