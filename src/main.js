import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import 'animate.css'
import '@/css/reset.css'
import '@/css/index.css'
import '@/css/index.scss'
import {
  Pagination,
  Scrollbar,
  Tooltip,
  Loading,
  Button,
  ColorPicker,
  Collapse,
  CollapseItem,
  InputNumber,
  Select,
  Option,
  MessageBox,
  Notification,
  Message
} from 'element-ui';
import '@/css/element-variables.scss'
import '@/directive/select'
import '@/directive/drag'
import '@/iconfont/iconfont'
import '@/iconfont/iconfont.css'
import '@/keycode/index'
import store from '@/store'
// Vue.config.productionTip = false
Vue.use(Pagination);
Vue.use(Scrollbar);
Vue.use(Tooltip);
Vue.use(Button);
Vue.use(ColorPicker);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Option);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

export default new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
