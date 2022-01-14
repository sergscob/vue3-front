import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { isAuth, clearAuth } from '../modules/api';
import LoginPage from '../modules/login/LoginPage.vue';
import LoggedInPage from '../modules/login/LoggedInPage.vue';
import Page404 from '../modules/404/Page404.vue';
import DeliveryPage from '../modules/delivery/DeliveryPage.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        beforeEnter: () => {
            if (isAuth()) return { path: '/' };
        }
    },
    {
        path: '/logout',
        component: LoginPage,
        beforeEnter: () => {
            clearAuth();
            console.log('logout');

            return { path: '/login' };
        }
    },
    {
        path: '/',
        // redirect: '/delivery',
        component: LoggedInPage,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/delivery',
                name: 'Delivery',
                component: DeliveryPage
            }
        ]
    },
    { name: '404', path: '/:pathMatch(.*)*', component: Page404 }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = isAuth();
    if (to.meta.requiresAuth && !isLoggedIn) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router;
