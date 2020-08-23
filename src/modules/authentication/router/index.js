export default {
    path: '/authentication',
    component: () => import('@/layouts/blank-layout/Blanklayout'),
    children: [
        {
            name: 'Login',
            path: 'login',
            component: () => import('@/modules/authentication/views/Login'),
        },
        {
            name: 'RememberPassword',
            path: 'remember-password',
            component: () => import('@/modules/authentication/views/RememberPassword'),
        },
        {
            name: 'Error',
            path: 'error',
            component: () => import('@/modules/authentication/views/Error'),
        },
    ]
}