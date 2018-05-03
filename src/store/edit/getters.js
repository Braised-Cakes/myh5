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
  currentPhone(state) {
    return state.phone.data[state.currentPage];
  },
  /**
   * 当前页数据
   * @return {Object}
   */
  curPageItemLen(state) {
    return state.phone.data[state.currentPage].data.length;
  },
  /**
   * 当前元素
   * @return {Object}
   */
  curItem(state, getters) {
    return getters.currentPhone.data[state.curItemId] || false;
  },

  /**
   * 是否有被选中元素
   */
  hasSelectedItems(state) {
    return state.curItemId >= 0 ? true : false;
  },
  /**
   * 被选中元素的id
   */
  curItemId(state) {
    return state.curItemId;
  },
  /**
   * 当前页的cache数据
   */
  curCache(state) {
    return state.cacheData[state.currentPage];
  }
}
