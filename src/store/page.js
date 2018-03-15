import Vue from 'vue'
import $ from 'jquery'
const types = {
    ADD_PAGE: 'ADD_PAGE',
    DEL_PAGE: 'DEL_PAGE',
    SORT_PAGE: 'SORT_PAGE',
    SELECT_PAGE: 'SELECT_PAGE',
    EMPTY_PAGE: 'EMPTY_PAGE'
}
/**
 * 空白页模版
 */
const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
}
// initial state
const state = {
    currentPage: 0
}
// getters
const getters = {
    /**
     * @return {Number} 页码长度
     */
    pageLength(state, getters, rootState) {
        return rootState.phone.data.length;
    },
    /**
     * @return {Number} 当前页码， 从0开始
     */
    currentPage(state) {
        return state.currentPage
    }
}
// actions
const actions = {
    /**
     * 改变活跃页
     * @param {Number} page 页码
     */
    selectPage({
        commit,
        state,
        dispatch,
        getters
    }, page) {
        if (getters.currentPage == page) {
            return;
        }
        commit(types.SELECT_PAGE, {
            page: page
        });
    },
    /**
     * 页尾增加一页
     */
    addPage({
        commit,
        getters,
        dispatch
    }) {
        console.log(getters)
        commit(types.ADD_PAGE, {
            phoneData: getters.phoneData
        })
    },
    /**
     * 删除指定页
     * @param {Number} page 页码
     */
    delPage({
        commit,
        state,
        dispatch,
        getters
    }, page) {
        if (getters.pageLength > 1) {
            commit(types.DEL_PAGE, {
                phoneData: getters.phoneData,
                page: page
            });
            if (getters.currentPage > getters.phoneData.data.length - 1) {
                dispatch('selectPage', getters.phoneData.data.length - 1);
            }
        } else {
            console.log('最少1页， 是否清空该页内容')
        }
    },
}
// mutations
const mutations = {
    /**
     * 选择一页
     * @param {Number} page 页码
     */
    [types.SELECT_PAGE](state, {
        page
    }) {
        state.currentPage = page;
    },
    /**
     * 页尾增加一页
     * @param {Number} phoneData 数据列表
     */
    [types.ADD_PAGE](state, {
        phoneData
    }) {
        phoneData.data.push($.extend(true, {}, BASE_BLANK));
    },
    /**
     * 删除指定页
     * @param {Number} phoneData 数据列表
     * @param {Number} page      要删除的页码
     */
    [types.DEL_PAGE](state, {
        phoneData,
        page
    }) {
        phoneData.data.splice(page, 1);
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
