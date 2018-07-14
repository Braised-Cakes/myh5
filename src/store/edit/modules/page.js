import Vue from 'vue'
import $ from 'jquery'
import * as types from '../mutation-types.js'
import * as constant from '@/constant'
import app from '@/main'
import * as utils from '@/utils'

const page = {
    namespaced: true,
    state: {
        currentPage: 0,
    },
    getters: {

        /**
         * 总页码
         * @return {Number} 
         */

        pageLength: (state, getters, rootState) => rootState.edit.phone.data.length,

        /**
         * 当前页码， 从0开始
         * @return {Number} 
         */

        currentPage: state => state.currentPage,
    },
    actions: {
        /**
         * 复制指定页
         * @param from 被复制的页码
         * @param to   复制到哪页
         */
        async copyPage({
            commit,
            state,
            dispatch,
            getters
        }, {
            from = getters.currentPage,
            to = getters.currentPage + 1
        } = {}) {
            if (from < 0 || from >= getters.phoneData.data.length) {
                return;
            }
            await dispatch('addPage', {
                go: false,
                record: false
            });
            Vue.nextTick().then(async () => {
                let data = $.extend(true, {}, state.phone.data[from]);
                data.data.forEach((item) => {
                    commit(types.ADD_CREATED_ID);
                    item.id = `item_${state.phone.main.createdDomId}`
                });
                commit(types.CHANGE_DATA, {
                    page: to,
                    data: data
                });
                await dispatch('selectPage', {
                    page: to
                });
                // dispatch('record', {
                //     type: 'page',
                //     data: data
                // })
            })
        },
        /**
         * 改变活跃页
         * @param {Number} page 页码
         */
        async selectPage({
            commit,
            dispatch,
            getters
        }, {
            page,
            ani = true
        }) {
            /* 取消所有选中元素 */
            await dispatch('edit/cancelSelect', null, {
                root: true
            });
            /* 取消所有选中元素 */
            await commit(types.SELECT_PAGE, {
                page: page
            });
            /* 执行当前页动画 */
            Vue.nextTick().then(() => {
                ani && utils.runCurPhoneAni();
            })
        },
        /**
         * 增加一页
         * @param {Boolean} go 是否选中新页面
         * @param {Boolean} record 是否记录cache
         */
        async addPage({
            commit,
            dispatch,
            getters,
            rootGetters
        }, {
            go = true,
            record = true
        } = {}) {
            commit(types.ADD_PAGE, {
                index: getters.currentPage,
                phoneData: rootGetters['edit/phoneData']
            })
            go && await dispatch('selectPage', {
                page: getters.currentPage + 1
            });
            // record && dispatch('record', {
            //     type: 'page',
            //     data: rootGetters.currentPhone
            // })
        },
        /**
         * 排序
         */
        async sortPage({
            commit,
            state,
            getters,
            dispatch
        }, data) {
            await dispatch('selectPage', {
                page: data.futureIndex,
                ani: false
            });
            let arr = [];
            data.value.forEach((item) => {
                for (let i = 0; i < getters.phoneData.data.length; i++) {
                    if (getters.phoneData.data[i] == item) {
                        arr.push(state.cacheData[i])
                    }
                }
            })
            commit(types.CHANGE_DATA, {
                data: data.value
            });
            // dispatch('record', {
            //     type: 'init',
            //     data: arr
            // })
        },
        /**
         * 删除指定页
         * @param {Number} page 页码
         */
        async delPage({
            commit,
            dispatch,
            getters,
            rootGetters
        }, page) {
            if (getters.pageLength > 1) {
                commit(types.DEL_PAGE, {
                    phoneData: rootGetters['edit/phoneData'],
                    page: page
                });
                if (getters.currentPage > rootGetters['edit/phoneData'].data.length - 1) {
                    await dispatch('selectPage', {
                        page: rootGetters['edit/phoneData'].data.length - 1
                    });
                }
                // dispatch('record', {
                //     type: 'delPage',
                //     page: page
                // })
            } else {
                app.$alert('最少保留一页内容', {
                    closeOnClickModal: true,
                    callback: () => {}
                });
            }
        },
    },
    mutations: {

        /**
         * 选择一页
         * @param {Number} page 页码
         */

        [types.SELECT_PAGE](state, {
            page,
        }) {
            state.currentPage = page;
        },

        /**
         * 添加一页
         * @param {Object} phoneData 数据列表
         * @param {Number} index 第index页后新增空白页
         */

        [types.ADD_PAGE](state, {
            index,
            phoneData
        }) {
            phoneData.data.splice(index + 1, 0, $.extend(true, {}, constant.BASE_BLANK));
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
        },
    },
};

export default page;
