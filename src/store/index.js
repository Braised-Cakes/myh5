import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import edit from './edit'
import * as constant from '@/constant'
Vue.use(Vuex);
const state = {
  auth: {
    request: false,
    username : null
  }
};
const getters = {};
const actions = {
  setUser({
    commit
  }, payload) {
    commit('bbb', payload)
  }
};
const mutations = {
  ['RESET'](state) {
    for (let attr in state) {
      if (attr == 'edit') {
        state[attr] = $.extend(true, {}, constant.initState)
      }
    }
  },
  bbb(state, {
    username,
    request
  }) {
    state.auth.username = username;
    state.auth.request = request;
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
