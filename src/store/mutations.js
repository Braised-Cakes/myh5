import {

    SAVE_ADDRESS,
    SORT_PAGE
} from './mutation-types.js'


export default {
    //删除地址列表
    [SAVE_ADDRESS](state, newAdress) {
        state.removeAddress = newAdress
    },
    /**
     * 选择一页
     * @param {Number} page 页码
     */
    // [SORT_PAGE](state, payload) {
    //     state.phone.data = payload;
    //     // state.currentPage = page;
    // },
}
