import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store";

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: 'login'
    },
    {
        path: '/index',
        component: () => import('../afterLogin/AfterApp.vue'),
        children: [
            {
                path: '/admin/boss',
                component: () => import('../admin/boss/BossOperation.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/admin/master',
                component: () => import('../admin/master/MasterOperation'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/index/index.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'sports',
                name: 'sports',
                component: () => import('../views/index/Sports.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'music',
                name: 'music',
                component: () => import('../views/index/Music.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'international',
                name: 'international',
                component: () => import('../views/index/International.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('../views/about/about.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'article/:id',
                name: 'article',
                component: () => import('../views/article/Article.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'account/:id',
                name: 'account',
                component: () => import('../views/account/Account.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'post',
                name: 'post',
                component: () => import('../views/post/Post.vue'),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'search',
                name: 'search',
                component: () => import('../views/search/Search'),
                meta: {
                    requireAuth: true
                }
            }
        ],
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/Login.vue'),
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register/Register.vue'),
        meta: {
            requireAuth: false
        }
    }

]

const router = new VueRouter({
    routes,
    mode: "history"
})

router.beforeEach((to, from, next) => {
    // ????????????????????????????????? meta
    // ??????????????????
    if (to.meta.requireAuth) {
        // ????????? username
        // ???????????????
        if (store.state.token !== '') {
            // ???????????? token ??????????????????
            // ????????? server ??????
            axios.post(axios.defaults.baseURL + "/controller/isToken",
                { "token" : store.state.token } )
                .then(function (resp) {
                if ( resp.data ) {
                    next() ;
                }
                else {
                    next('/login');
                }
            });

        }
        // ???????????????????????????
        else {
            next('/login');
        }
    }
    // ??????????????????
    // ?????????
    else {
        next() ;
    }
})

export default router
