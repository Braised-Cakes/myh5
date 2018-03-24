import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'


const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
};

export default {
    /**
     * 页面排序
     */
    [types.UPDATE_PHONE_DATA](state, {
        phoneData,
        oldPage,
        newPage
    }) {
        Vue.set(phoneData.data, newPage, $.extend(true, {}, phoneData.data[oldPage]))
    },
    /**
     * 页面排序
     */
    [types.SORT_PAGE](state, {
        phoneData,
        newVal
    }) {
        phoneData.data = newVal;
    },
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
     * 
     * @param {Object} phoneData 数据列表
     * @param {Number} index 第index页后新增空白页
     */
    [types.ADD_PAGE](state, {
        index,
        phoneData
    }) {
        phoneData.data.splice(index + 1, 0, $.extend(true, {}, BASE_BLANK));
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
    [types.SET_PHONE](state, payload) {
        if (!$.isEmptyObject(payload)) {
            state.phone = payload;
        } else {
            state.phone = {
                main: {},
                data: [$.extend(true, {}, BASE_BLANK)]
            }
        }
    },
    // [types.RESET](state, payload) {
    //     for(let attr in state){
    //         state[]
    //     }
    //     // state = $.extend(true, {}, {
    //     //     phone: {
    //     //         main: {},
    //     //         data: [$.extend(true, {}, BASE_BLANK)]
    //     //     },
    //     //     currentPage: 0
    //     // });
    //     // console.log(state)
    //     // state.phone = {
    //     //     main: {},
    //     //     data: [$.extend(true, {}, BASE_BLANK)]
    //     // };
    //     // state.currentPage = 0;
    // },





    [types.UPDATE_PHONE](state, {
        item,
        key,
        val
    }) {
        Vue.set(item, 'main', val)
    },
    [types.ADD_ITEM](state, {
        currentPhone,
        item
    }) {
        currentPhone.data = currentPhone.data || [];
        currentPhone.data.push(item);
        Vue.set(currentPhone, 'data', currentPhone.data);
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
