import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import edit from './edit'
import * as constant from '@/constant'
Vue.use(Vuex);
const state = {};
const getters = {};
const actions = {};
const mutations = {
  ['RESET'](state) {
    for (let attr in state) {
      state[attr] = $.extend(true, {}, constant.initState)
    }
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
