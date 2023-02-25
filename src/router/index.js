import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
    base: '',
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/index/index'),
            children: [
                {
                    path: 'file',
                    name: 'file',
                    component: () => import('@/components/FileView')
                },
                {
                    path: 'manager',
                    name: 'manager',
                    component: () => import('@/components/Manager')
                }
            ],
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