import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import page from './page'
import m_phone from './phone'
import $ from 'jquery'
import * as api from '@/api/index'
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
    getters: {},
    actions,
    mutations,
    modules: {
        page,
        // phone
        m_phone,
        // panel,
        // setting
    }
})
