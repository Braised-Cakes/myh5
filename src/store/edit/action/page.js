import Vue from 'vue'
import $ from 'jquery'
import * as types from '../mutation-types.js'
import app from '@/main'
import * as utils from '@/utils'
export default {
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
  }) {
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
      dispatch('record', {
        type: 'page',
        data: data
      })
    })
  },
  /**
   * 改变活跃页
   * @param {Number} page 页码
   */
  async selectPage({
    commit,
    dispatch
  }, {
    page,
    ani = true
  }) {
    await dispatch('cancelSelect');
    await commit(types.SELECT_PAGE, page);
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
    getters
  }, {
    go = true,
    record = true
  }) {
    commit(types.ADD_PAGE, {
      index: getters.currentPage,
      phoneData: getters.phoneData
    })
    go && await dispatch('selectPage', {
      page: getters.currentPage + 1
    });
    record && dispatch('record', {
      type: 'page',
      data: getters.currentPhone
    })
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
    dispatch('record', {
      type: 'init',
      data: arr
    })
  },
  /**
   * 删除指定页
   * @param {Number} page 页码
   */
  async delPage({
    commit,
    dispatch,
    getters
  }, page) {
    if (getters.pageLength > 1) {
      commit(types.DEL_PAGE, {
        phoneData: getters.phoneData,
        page: page
      });
      if (getters.currentPage > getters.phoneData.data.length - 1) {
        await dispatch('selectPage', {
          page: getters.phoneData.data.length - 1
        });
      }
      dispatch('record', {
        type: 'delPage',
        page: page
      })
    } else {
      app.$alert('最少保留一页内容', {
        closeOnClickModal: true,
        callback: () => {}
      });
    }
  },
}
