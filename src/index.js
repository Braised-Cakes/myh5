// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import 'animate.css'
import '@/css/reset.css'
import '@/css/index.css'
import '@/css/element-variables.scss'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/directive/select'
import '@/directive/drag'

import '@/iconfont/iconfont'
import '@/iconfont/iconfont.css'
import '@/keycode'

// Vue.config.productionTip = false
/* eslint-disable no-new */
import store from '@/store'
import $ from 'jquery'

$.fn.extend({
    animateCss: function (animationName, callback) {
        // var animationEnd = (function (el) {
        //     var animations = {
        //         animation: 'animationend',
        //         OAnimation: 'oAnimationEnd',
        //         MozAnimation: 'mozAnimationEnd',
        //         WebkitAnimation: 'webkitAnimationEnd',
        //     };

        //     for (var t in animations) {
        //         if (el.style[t] !== undefined) {
        //             return animations[t];
        //         }
        //     }
        // })(document.createElement('div'));
        
        setTimeout(() => {
            this[0].classList.forEach((item) => {
                if (!/phone-item/.test(item)) {
                    $(this).removeClass(item);
                }
            })
            this.css({
                'animation': ''
            });
        }, 10)
        setTimeout(()=>{
            this.stop(true, true);
        }, 50)
        setTimeout(() => {
            this.addClass('animated ' + animationName).one('animationend', function () {
                $(this).removeClass('animated ' + animationName);
                if (typeof callback === 'function') callback();
            });
        }, 100)


        return this;
    },
});
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
