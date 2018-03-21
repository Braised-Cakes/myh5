import Vue from 'vue'
import tpl from '../tpl'
import * as api from '@/api/index'
import $ from 'jquery'
const types = {
    SET_PHONE: 'SET_PHONE',
    ADD_ITEM: 'ADD_ITEM',
    DEL_ITEM: 'DEL_ITEM',
    SELECT_ITEM: 'SELECT_ITEM',
    CANCEL_SELECT: 'CANCEL_SELECT',
    UPDATE_ITEM: 'UPDATE_ITEM'
};
/**
 * mutations 增， 删， 改
 * 选中， 取消选中
 * 增加， 删除
 * 修改
 */
// initial state
const state = {}
// getters
const getters = {
    /**
     * phone数据
     * @return {Object}
     */
    phoneData(state, getters, rootState) {
        return rootState.phone
    },
    /**
     * 当前页数据
     * @return {Object}
     */
    currentPhone(state, getters, rootState) {
        return rootState.phone.data[rootState.page.currentPage];
    },
    /**
     * 当前元素
     * @return {Object}
     */
    currentItem(state, getters) {
        return getters.currentPhone.data[0] || {};
    },
}
// actions
const actions = {
    
    addItem({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, payload) {
        commit(types.ADD_ITEM, {
            currentPhone: getters.currentPhone,
            item: tpl.txt()
        });
    },
    updateItem({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, {
        key,
        val
    }) {
        console.log(val)
        commit(types.UPDATE_ITEM, {
            item: getters.currentItem,
            key: key,
            val: val
        });
    },
}
// mutations
const mutations = {
    [types.ADD_ITEM](state, {
        currentPhone,
        item
    }) {
        currentPhone.data = currentPhone.data || [];
        currentPhone.data.push(item);
        Vue.set(currentPhone, 'data', currentPhone.data);
        // state.currentItemId = currentPhone.data.length - 1;
    },
    [types.UPDATE_ITEM](state, {
        item,
        key,
        val
    }) {
        if (typeof val == 'string') {
            Vue.set(item, key, val);
        } else {
            for (const attr in val) {
                Vue.set(item[key], attr, val[attr]);
            }
        }
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
