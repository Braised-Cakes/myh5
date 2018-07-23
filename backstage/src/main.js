import Vue from 'vue'
import 'animate.css'
import {
    Pagination,
    Scrollbar,
    Form,
    Tooltip,
    Loading,
    Button,
    ColorPicker,
    Collapse,
    CollapseItem,
    InputNumber,
    Input,
    Select,
    Option,
    Radio,
    RadioGroup,
    OptionGroup,
    MessageBox,
    Notification,
    Upload,
    FormItem,
    Message,
    Dialog,
    Checkbox
} from 'element-ui';
import App from '@/App'
import router from '@/router'
import Crop from '@/components/crop'
import Image from '@/components/image'
import Shape from '@/components/shape'
import Music from '@/components/music'
import store from '@/store'
import '@/css/reset.css'
import '@/css/index.css'
import '@/css/index.scss'
import '@/css/element-variables.scss'
import '@/iconfont/iconfont.css'
import '@/directive/select'
import '@/directive/drag'
import "@/directive/changesize";
import '@/keycode/index'

Vue.config.productionTip = process.env.NODE_ENV !== 'production';
Vue.prototype.$ELEMENT = {
    size: 'mini',
    // zIndex: 3000
};
Vue.use(Pagination);
Vue.use(Scrollbar);
Vue.use(Form);
Vue.use(Tooltip);
Vue.use(Button);
Vue.use(ColorPicker);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(InputNumber);
Vue.use(Input);
Vue.use(Select);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Upload);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.use(Crop);
Vue.use(Image);
Vue.use(Shape);
Vue.use(Music);
export default new Vue({
    router: router,
    store: store,
    render: h => h(App)
}).$mount('#app')