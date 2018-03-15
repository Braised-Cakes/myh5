import Vue from 'vue'
const types = {
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
const state = {
}
// getters
const getters = {
    /**
     * phone数据
     * @return {Object}
     */
    phoneData(state, getters, rootState) {
        return rootState.phone
    },
}
// actions
const actions = {}
// mutations
const mutations = {

}
export default {
    state,
    getters,
    actions,
    mutations
}
