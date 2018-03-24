export default {
    /**
     * @return {Number} 一共有几页
     */
    pageLength(state) {
        return state.phone.data.length;
    },
    /**
     * @return {Number} 当前页码， 从0开始
     */
    currentPage(state) {
        return state.currentPage
    },

    /**
     * phone数据
     * @return {Object}
     */
    phoneData(state) {
        return state.phone
    },
    /**
     * 当前页数据
     * @return {Object}
     */
    currentPhone(state, getters, rootState) {
        return state.phone.data[getters.currentPage];
    },
    /**
     * 当前元素
     * @return {Object}
     */
    currentItem(state, getters) {
        return getters.currentPhone.data[0] || {};
    }
}
