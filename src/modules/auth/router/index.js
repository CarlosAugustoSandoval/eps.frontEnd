export default {
    path: '/auth',
    component: () => import('@/layouts/blank-layout/Blanklayout'),
    children: [
        {
            name: 'Login',
            path: 'login',
            component: () => import('@/modules/auth/views/Login'),
            meta: {
                requiresAuth: false
            }
        },
        {
            name: 'ForgotPassword',
            path: 'forgot-password',
            component: () => import('@/modules/auth/views/ForgotPassword'),
            meta: {
                requiresAuth: false
            }
        },
        {
            name: 'Error',
            path: 'error',
            component: () => import('@/modules/auth/views/Error'),
            meta: {
                requiresAuth: false
            }
        },
    ]
}