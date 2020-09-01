import Vue from 'vue'
import Router from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import store from "../store/store";

import mipresRoutes from '@/modules/mipres/router'
import authenticationRoutes from '@/modules/auth/router'
import administrativoRoutes from '@/modules/administrativo/router'

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
                    component: () => import('@/views/Home'),
                    meta: {
                        requiresAuth: true,
                        title: {
                            text: 'Home',
                            icon: 'mdi-home',
                            color: 'red',
                            breadcrumbs: [
                                {
                                    text: 'Inicio',
                                    disabled: true
                                }
                            ]
                        }
                    }
                },
            ]
        },
        mipresRoutes,
        authenticationRoutes,
        administrativoRoutes
    ]
})

// navigation guards before each
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.user === null) {
            next({ name: 'Login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router