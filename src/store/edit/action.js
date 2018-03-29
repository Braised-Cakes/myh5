import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'
import * as api from '@/api'
import tpl from '@/tpl'
export default {
    /**
     * 复制某一页
     * @param {Number} page 页码
     */
    copyPage({
        commit,
        state,
        dispatch,
        getters
    }, page) {
        let oldPage = getters.currentPage;
        dispatch('addPage');
        commit(types.CHANGE_DATA, {
            page: getters.currentPage,
            data: state.phone.data[oldPage]
        });
    },
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
        dispatch('cancelSelect');
        commit(types.SELECT_PAGE, page);
    },
    /**
     * 页尾增加一页
     */
    addPage({
        commit,
        getters,
        dispatch
    }) {
        commit(types.ADD_PAGE, {
            index: getters.currentPage,
            phoneData: getters.phoneData
        })
        dispatch('selectPage', getters.currentPage + 1);
    },
    /**
     * 排序
     */
    sortPage({
        commit,
        getters,
        dispatch,
        rootState
    }, data) {
        commit(types.CHANGE_DATA, {
            data: data.value
        });
        dispatch('selectPage', data.futureIndex);
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
            app.$alert('最少保留一页内容', {
                closeOnClickModal: true
            });
        }
    },



    setPhone({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, {
        id
    }) {
        console.log(state)
        api.getEdit({
            id: id
        }).then((res) => {
            commit(types.SET_PHONE, res.result.data.data);
        })
    },
    reset({
        commit
    }) {
        commit(types.RESET);
    },
    addItem({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, payload) {
        let itemTpl = tpl.txt();
        itemTpl.style['z-index'] = getters.curPageItemLen + 1;
        commit(types.ADD_ITEM, {
            currentPhone: getters.currentPhone,
            item: itemTpl
        });
        commit(types.SELECT_ITEM, getters.curPageItemLen - 1)
    },
    updateItem({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, {
        item,
        key,
        val
    }) {
        console.log(val)
        commit(types.UPDATE_ITEM, {
            item: item || getters.curItem,
            key: key,
            val: val
        });
    },

    updatePhone({
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
        commit(types.UPDATE_PHONE, {
            item: getters.currentPhone,
            val: val
        });
    },

    /**
     * 取消选中
     */
    cancelSelect({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }) {
        //加定时器，以保证先触发ele ui的事件，后取消选中元素
        setTimeout(() => {
            commit(types.SELECT_ITEM, -1);
        }, 0);
    },
    /**
     * 选择元素
     * @param {Number} index
     */
    selectItem({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, index) {
        commit(types.SELECT_ITEM, index);
    },
    /**
     * 删除指定元素
     * @param {Number} index
     */
    delItem({
        commit,
        dispatch,
        getters
    }, curItemId) {
        dispatch('cancelSelect');
        commit(types.DEL_ITEM, {
            curItemId: curItemId,
            curPageId: getters.currentPage
        });
    },
}
