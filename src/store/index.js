import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


// 用来存储数据
const state = {
    machineInfo: {
        screenWidth:document.documentElement.clientWidth, //屏幕宽度
        screenHeight:document.documentElement.clientHeight, //屏幕高度
    },
    
    token: sessionStorage.getItem('token') || '',
    isAuth: sessionStorage.getItem('isAuth') === 'true' || false
}
// 响应组件中的事件
const actions = {
}
// 操作数据
const mutations = {
    UPDATEUSERINFO(state, value) {
        if (value.token !== undefined) {
            state.token = value.token
            sessionStorage.setItem('token', state.token)
        }
        if (value.isAuth !== undefined) {
            state.isAuth = value.isAuth
            sessionStorage.setItem('isAuth', state.isAuth)
        }
    },
    setInnerWH(state, value) {
        state.machineInfo.screenWidth = value.width
        state.machineInfo.screenHeight = value.height
    }
}
// 用来将state数据进行加工
const getters = {
}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})