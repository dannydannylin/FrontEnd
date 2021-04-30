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
    // 如果路由要跳轉的地方的 meta
    // 是需要權限的
    if (to.meta.requireAuth) {
        // 如果有 username
        // 就可以前進
        if (store.state.token !== '') {
            // 判斷這個 token 是不是偽造的
            // 可否被 server 解析
            axios.post("https://danforum.azurewebsites.net/demo-0.0.1-SNAPSHOT/controller/isToken",
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
        // 否則就跳到登入頁面
        else {
            next('/login');
        }
    }
    // 如果不用權限
    // 直接走
    else {
        next() ;
    }
})

export default router
