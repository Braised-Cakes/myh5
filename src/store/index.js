import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import edit from './edit'
import * as api from '@/api'
import * as constant from '@/constant'
Vue.use(Vuex);
const state = {};
const getters = {};
const actions = {};
const mutations = {
    ['RESET'](state) {
        for (let attr in state) {
            state[attr] = {
                phone: {
                    main: {},
                    data: [$.extend(true, {}, constant.BASE_BLANK)]
                },
                currentPage: 0,
                curItemId: -1
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
