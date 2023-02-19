import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import store from './store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  mounted() {
    var _this = this
    window.onresize = function(){ // 定义窗口大小变更通知事件
      let info = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
      _this.$store.commit('setInnerWH', info)
    }
  }
}).$mount('#app')