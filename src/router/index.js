import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    base: '',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index/index'),
            meta: {
                needAuth: false
            }
        },
        {
            path: '/user/login',
            name: 'login',
            component: () => import('@/views/login/index')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.needAuth && !store.state.isAuth) {
        next('/user/login')
        return
    }
    next()
})

export default router