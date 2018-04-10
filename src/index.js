// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import 'animate.css'
import '@/css/reset.css'
import '@/css/index.css'
import '@/css/index.scss'
import ElementUI from 'element-ui'
import '@/css/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/directive/select'
import '@/directive/drag'

import '@/iconfont/iconfont'
import '@/iconfont/iconfont.css'
import '@/keycode'

Vue.config.productionTip = false
/* eslint-disable no-new */
import store from '@/store'
import $ from 'jquery'

Vue.use(ElementUI);
export default new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});
