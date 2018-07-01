import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import edit from './edit'
import * as constant from '@/constant'
Vue.use(Vuex);
const state = {
    auth: {
        request: false,
        username: null
    }
};
const getters = {};
const actions = {};
const mutations = {
    ['RESET'](state) {
        for (let attr in state) {
            if (attr == 'edit') {
                state[attr] = $.extend(true, {}, constant.initState)
            }
        }
    },
    UPDATE_USER_INFO(state, {
        username,
        uid
    }) {
        state.auth.username = username;
        state.auth.uid = uid;
    }
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
