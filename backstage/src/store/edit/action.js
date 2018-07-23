import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'
import * as api from '@/api'
import tpl from '@/tpl'
import * as utils from '@/utils'
import config from '@/config'
import page from './action/page'
import app from '@/main'
export default {
    ...page,
    setPhone({
        commit,
        dispatch
    }, {
        id
    }) {
        api.getScene({
            id: id
        }).then(({
            result,
            message,
            status
        }) => {
            if (status == 1) {
                app.$alert(message, {
                    closeOnClickModal: true,
                    callback: () => {
                        app.$router.push('/list');
                    }
                });
            } else {
                commit(types.SET_PHONE, result.data);
                commit(types.OTHERINFO, result)
                //记录
                if (result.data) {
                    dispatch('record', {
                        type: 'phone',
                        data: result.data.data
                    })
                    let data = result.data.data;
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < data[i].data.length; j++) {
                            if (data[i].data[j].type != 'shape') {
                                continue;
                            }
                            let dom = $(`<embed src="/store/${data[i].data[j].path}"></embed>`);
                            $("#svg_cache").append(dom);
                            $(dom).on("load", () => {
                                let docs = dom[0].getSVGDocument();
                                $(dom).remove();
                                let svg = $(docs).find('svg')
                                if (!$(svg).attr('viewbox')) {
                                    $(svg).attr('viewbox', `0 0 ${data[i].data[j].width} ${data[i].data[j].height}`);
                                }
                                $(svg).attr('width', '100%');
                                $(svg).attr('height', '100%');
                                $(svg).attr('preserveAspectRatio', 'none');
                                for (let attr in data[i].data[j].fill) {
                                    $(svg).find(`*[fill="${attr}"]`).css('fill', data[i].data[j].fill[attr])
                                }
                                dispatch('updateItem', {
                                    item: data[i].data[j],
                                    key: 'content',
                                    val: $(svg).prop('outerHTML')
                                });
                            });
                        }
                    }
                    Vue.nextTick().then(() => {
                        utils.runCurPhoneAni();
                    })
                }
            }
        });
    },
    addItem({
        commit,
        getters
    }, payload) {
        let itemTpl = tpl[payload.type].create(payload);
        commit(types.ADD_CREATED_ID);
        itemTpl.style['z-index'] = getters.curPageItemLen + 1;
        itemTpl.id = 'item_' + getters.phoneData.main.createdDomId;
        itemTpl.event = {};
        commit(types.ADD_ITEM, {
            currentPhone: getters.currentPhone,
            item: itemTpl
        });
        commit(types.SELECT_ITEM, getters.curPageItemLen - 1);
        tpl[payload.type].afterCreate && tpl[payload.type].afterCreate(itemTpl);
    },
    updateItem({
        commit,
        getters,
        dispatch
    }, {
        item,
        key,
        val,
        fill
    }) {
        if (!key) {
            console.log('key不存在')
            return;
        }
        commit(types.UPDATE_ITEM, {
            item: item || getters.curItem,
            key: key,
            val: val,
            fill: fill
        });
        dispatch('record', {
            type: 'item',
            data: getters.currentPhone,
            page: getters.currentPage
        })
    },
    /**
     * 更新phoneData某一page的main
     * @param {*} param0 
     * @param {*} param1 
     */
    updateSomePageMain({
        commit,
        getters
    }, {
        key,
        val
    }) {
        commit(types.UPDATE_PHONE, {
            item: getters.currentPhone,
            key: key,
            val: val
        });
        // dispatch('record', {
        //     type: 'item',
        //     data: getters.currentPhone,
        //     page: getters.currentPage
        // })
    },

    /**
     * 取消选中
     * promise: 
     */
    cancelSelect({
        commit
    }) {
        return new Promise((resolve) => {
            setTimeout(() => {
                commit(types.SELECT_ITEM, -1);
                resolve()
            }, 0)
        });
    },
    /**
     * 选中元素
     * @param {Number|Array} ids
     */
    selectItem({
        commit,
        getters
    }, ids) {
        if (getters.selectedItemsForArray.indexOf(ids) != -1) {
            // 元素已被选中
            return;
        }
        if (typeof ids == 'object' && ids.length == 1) {
            commit(types.SELECT_ITEM, ids[0]);
        } else {
            commit(types.SELECT_ITEM, ids);
        }
    },
    /**
     * 删除指定元素
     * @param {Number} id 被删除元素的id, 默认删除所有选中元素
     */
    async delItem({ commit, dispatch, getters }, id) {
        const selectedItems = $.extend(true, [], getters.selectedItemsForArray)
        await dispatch('cancelSelect');
        if (!id) {
            for (let i = selectedItems.length - 1; i >= 0; i--) {
                commit(types.DEL_ITEM, {
                    id: selectedItems[i],
                    page: getters.currentPage
                });
            }
        }
        /**
         * 调整z-index,  z-index从1开始，依次递增
         * 对当前页所有元素的z-index进行修复
         */
        let list = $.extend(true, [], getters.currentPhone.data);
        list.sort((a, b) => {
            return a.style['z-index'] - b.style['z-index']
        })
        for (let i = 0; i < list.length; i++) {
            if (list[i].style['z-index'] != i + 1) {
                let item = getters.currentPhone.data.filter((item) => {
                    return item.id == list[i].id
                })[0]
                dispatch('updateItem', {
                    item: item,
                    key: 'style',
                    val: {
                        'z-index': i + 1
                    }
                })
            }
        }


    },
    /**
     * 更新phone的main
     */
    updateMain({
        commit
    }, json) {
        commit(types.UPDATE_MAIN, json)
    },
    /**
     * 记录
     */
    record({
        commit,
        getters
    }, {
        type = 'item',
        data,
        page
    }) {
        if (!config.revoke) {
            return;
        }
        if (getters.curCache && (getters.curCache.index < getters.curCache.list.length - 1)) {
            commit(types.RECORD, {
                type: 'del',
                page: page
            })
        }
        console.log('记录啦')
        commit(types.RECORD, {
            type,
            data,
            page
        })
    },
    revoke({
        commit,
        getters
    }) {
        if (!config.revoke) {
            return;
        }
        if (getters.curCache.index == 0) {
            console.log('没有可撤销的了')
            return;
        }
        commit(types.CHANGE_DATA, {
            page: getters.currentPage,
            data: getters.curCache.list[getters.curCache.index - 1]
        });
        commit(types.REVOKE, {
            curCache: getters.curCache,
            index: getters.curCache.index - 1
        })
    },
    redo({
        commit,
        getters
    }) {
        if (!config.revoke) {
            return;
        }
        if (getters.curCache.index < getters.curCache.list.length - 1) {

            //当前页是知道的，
            commit(types.CHANGE_DATA, {
                page: getters.currentPage,
                data: getters.curCache.list[getters.curCache.index + 1]
            });
            commit(types.REDO, {
                curCache: getters.curCache,
                index: getters.curCache.index + 1
            })
            return;
        } else {
            console.log('没有可重做的了')
        }

    },
    // 裁切图片
    cropBgImage({ dispatch }, { path, data }) {
        app.$crop({
            src: path,
            data: data ? data : {
                width: 320,
                height: 486,
                type: "screen"
            },
            hasRight: false,
            callback: ({
                src,
                data,
                action
            }) => {
                if (action == "confirm") {
                    dispatch('updateSomePageMain', {
                        key: "background-image",
                        val: src
                    });
                    dispatch('updateSomePageMain', {
                        key: "background-crop",
                        val: data
                    });
                }
            }
        });
    }
}