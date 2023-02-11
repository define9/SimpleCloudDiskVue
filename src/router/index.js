import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    base: '',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index')
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('to', to.meta)
    console.log('from', from.meta)
    next()
})

export default router