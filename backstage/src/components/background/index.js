import Toast from './main.vue'

export default {
    install(Vue, options = {}) {
        const VueToast = Vue.extend(Toast)
        let toast = null

        function $toast(params) {
            return new Promise(resolve => {
                if (!toast) {
                    toast = new VueToast()

                    toast.$mount()

                    document.querySelector(options.container || 'body').appendChild(toast.$el)
                }
                console.log('plugin done')
                toast.init(params)
                resolve()
            })
        }

        Vue.prototype.$image = $toast
    }
}
