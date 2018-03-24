import Vue from 'vue'
import Vuex from 'vuex'
import edit from './edit/edit.js'
import $ from 'jquery'
import * as api from '@/api/index'
Vue.use(Vuex)
// const BASE_BLANK = {
//     main: {
//         background: '#ffffff'
//     },
//     data: []
// };
const initState = {
    phone: {
        main: {},
        data: [$.extend(true, {}, BASE_BLANK)]
    },
    currentPage: 0
}
const state = {

}
const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
};
const getters = {}
const actions = {}
const mutations = {
    ['RESET'](state) {
        for (let attr in state) {
            state[attr] = {
                phone: {
                    main: {},
                    data: [$.extend(true, {}, BASE_BLANK)]
                },
                currentPage: 0
            }
        }
    },
}
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters,
    actions,
    mutations,
    modules: {
        edit
    }
})
