import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import page from './page'
// import m_phone from './phone'
import $ from 'jquery'
Vue.use(Vuex)
const BASE_BLANK = {
    main: {
        background: '#ffffff',
        music: ''
    },
    data: []
};
const state = {
    phone: {
        main: {},
        data: [$.extend(true, {}, BASE_BLANK)]
    }
}

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    getters: {
        phoneData(state, getters, rootState) {
            return state.phone
        }
    },
    // actions,
    // mutations,
    modules: {
        page,
        // phone
        // m_phone,
        // panel,
        // setting
    }
})
