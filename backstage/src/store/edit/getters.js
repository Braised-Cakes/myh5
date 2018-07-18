const getters = {

    /**
     * 总页码
     * @return {Number} 
     */

    pageLength: state => state.phone.data.length,

    /**
     * 当前页码， 从0开始
     * @return {Number} 
     */

    currentPage: state => state.currentPage,

    /**
     * phone数据
     * @return {Object} 
     */

    phoneData: state => state.phone,

    /**
     * 当前页数据
     * @return {Object} 
     */

    currentPhone: (state, getters) => state.phone.data[getters.currentPage],

    /**
     * 当前页元素个数
     * @return {Object} 
     */

    curPageItemLen: state => state.phone.data[state.currentPage].data.length,

    /**
     * 当前被选中元素
     * @return {Object} 
     */

    curItem: (state, getters) => getters.currentPhone.data[state.curItemId] || false,

    /**
     * 是否有被选中元素
     * @return {Boolean} 
     */

    hasSelectedItems: state => (state.curItemId >= 0 || state.curItemIds.length > 0) ? true : false,

    /**
     * 是否是单选
     * @return {Boolean} 
     */

    hasSelectedOneItem: state => state.curItemId >= 0 ? true : false,

    /**
     * 是否是多选
     * @return {Boolean} 
     */

    hasSelectedMultiItems: state => state.curItemIds.length > 0 ? true : false,

    /**
     * 被选中元素的id(以数组形式返回，即使是单选)
     * @return {Array}
     */

    selectedItemsForArray: state => state.curItemId >= 0 ? [state.curItemId] : state.curItemIds,

    /**
     * 被选中元素的id
     * @return {Number} 
     */

    curItemId: state => state.curItemId,

    /**
     * 被选中元素的id集合
     * @return {Array} 
     */

    curItemIds: state => state.curItemIds,

    /**
     * 当前页的cache数据
     * @return {Object}
     */

    curCache: state => state.cacheData[state.currentPage],

    /**
     * 其他信息
     * @return {Object}
     */

    otherInfo: state => state.otherInfo,
};

export default getters;
