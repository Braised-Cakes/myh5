import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import 'animate.css'
import '@/css/reset.css'
import '@/css/index.css'
import '@/css/index.scss'
import ElementUI from 'element-ui'
import '@/css/element-variables.scss'
import '@/directive/select'
import '@/directive/drag'

import '@/iconfont/iconfont'
import '@/iconfont/iconfont.css'
import '@/keycode/index'

Vue.config.productionTip = false
/* eslint-disable no-new */
import store from '@/store'
Vue.use(ElementUI);
// export default new Vue({
//     el: '#app',
//     // router,
//     // store,
//     components: {
//         App
//     },
//     template: '<App/>'
// });

export default new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
