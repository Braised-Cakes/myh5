import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'
import * as api from '@/api'
import tpl from '@/tpl'
import app from '@/index'
import * as utils from '@/utils'
export default {
    /**
     * 复制某一页
     * @param {Number} page 页码
     */
    async copyPage({
        commit,
        state,
        dispatch,
        getters
    }, page) {
        let oldPage = getters.currentPage;
        await dispatch('addPage', {
            go: false
        });
        let data = $.extend(true, {}, state.phone.data[oldPage]);
        data.data.forEach((item) => {
            commit(types.ADD_CREATED_ID);
            item.id = `item_${state.phone.main.createdDomId}`
        });
        commit(types.CHANGE_DATA, {
            page: getters.currentPage + 1,
            data: data
        });
        await dispatch('selectPage', getters.currentPage + 1);
    },

    /**
     * 改变活跃页
     * @param {Number} page 页码
     */
    async selectPage({
        commit,
        state,
        dispatch,
        getters
    }, page) {
        // if (getters.currentPage == page) {
        //     return;
        // }
        await dispatch('cancelSelect');
        commit(types.SELECT_PAGE, page);
        //执行翻页动画
        Vue.nextTick()
            .then(function () {
                utils.runCurPhoneAni();
            });
    },
    /**
     * 增加一页
     * @param {Boolean} go 是否选中新页面
     */
    async addPage({
        commit,
        getters,
        dispatch
    }, {
        go = true
    }) {
        commit(types.ADD_PAGE, {
            index: getters.currentPage,
            phoneData: getters.phoneData
        })
        go && await dispatch('selectPage', getters.currentPage + 1);
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
    async delPage({
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
                await dispatch('selectPage', getters.phoneData.data.length - 1);
            }
        } else {
            app.$alert('最少保留一页内容', {
                closeOnClickModal: true,
                callback: action => {}
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
        let itemTpl = tpl.shape();
        itemTpl.style['z-index'] = getters.curPageItemLen + 1;
        itemTpl.id = 'item_' + getters.phoneData.main.createdDomId;
        commit(types.ADD_ITEM, {
            currentPhone: getters.currentPhone,
            item: itemTpl
        });
        commit(types.SELECT_ITEM, getters.curPageItemLen - 1)
        commit(types.ADD_CREATED_ID)
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
        val,
        fill
    }) {
        console.log(val)
        commit(types.UPDATE_ITEM, {
            item: item || getters.curItem,
            key: key,
            val: val,
            fill
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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit(types.SELECT_ITEM, -1);
                resolve()
            }, 0)
        });
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
    async delItem({
        commit,
        dispatch,
        getters
    }, curItemId) {
        await dispatch('cancelSelect');
        commit(types.DEL_ITEM, {
            curItemId: curItemId,
            curPageId: getters.currentPage
        });
    },
}
