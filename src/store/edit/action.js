import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'
import * as api from '@/api'
import tpl from '@/tpl'
import app from '@/main'
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
  }) {
    /**
     * 先增加一页， 然后
     */
    let oldPage = getters.currentPage;
    await dispatch('addPage', {
      go: false
    });
    Vue.nextTick().then(async () => {
      let data = $.extend(true, {}, state.phone.data[oldPage]);
      data.data.forEach((item) => {
        commit(types.ADD_CREATED_ID);
        item.id = `item_${state.phone.main.createdDomId}`
      });
      commit(types.CHANGE_DATA, {
        page: getters.currentPage + 1,
        data: data
      });
      await dispatch('selectPage', {
        page: getters.currentPage + 1
      });
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
   */
  async addPage({
    commit,
    dispatch,
    getters
  }, {
    go = true
  }) {
    commit(types.ADD_PAGE, {
      index: getters.currentPage,
      phoneData: getters.phoneData
    })
    go && await dispatch('selectPage', {
      page: getters.currentPage + 1
    });
  },
  /**
   * 排序
   */
  async sortPage({
    commit,
    dispatch
  }, data) {
    await dispatch('selectPage', {
      page: data.futureIndex,
      ani: false
    });
    commit(types.CHANGE_DATA, {
      data: data.value
    });
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
    } else {
      app.$alert('最少保留一页内容', {
        closeOnClickModal: true,
        callback: () => {}
      });
    }
  },
  setPhone({
    commit,
    dispatch
  }, {
    id
  }) {
    api.getEdit({
      id: id
    }).then((res) => {
      commit(types.SET_PHONE, res.result.data.data);
      let data = res.result.data.data.data;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.length; j++) {
          if (data[i].data[j].type != 'shape') {
            continue;
          }
          let dom = $(`<embed src="store/${data[i].data[j].path}"></embed>`);
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
    });
  },
  reset({
    commit
  }) {
    commit(types.RESET);
  },
  addItem({
    commit,
    getters

  }, payload) {
    let itemTpl;
    if (typeof payload == 'string') {
      itemTpl = tpl[payload]();
    } else {
      itemTpl = tpl[payload.type](payload);
    }
    itemTpl.style['z-index'] = getters.curPageItemLen + 1;
    itemTpl.id = 'item_' + getters.phoneData.main.createdDomId;
    itemTpl.event = {};
    commit(types.ADD_ITEM, {
      currentPhone: getters.currentPhone,
      item: itemTpl
    });
    commit(types.SELECT_ITEM, getters.curPageItemLen - 1)
    commit(types.ADD_CREATED_ID)
  },
  updateItem({
    commit,
    getters
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
      fill: fill
    });
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
    console.log(val)
    commit(types.UPDATE_PHONE, {
      item: getters.currentPhone,
      key: key,
      val: val
    });
  },

  /**
   * 取消选中
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
   * 选择元素
   * @param {Number} index
   */
  selectItem({
    commit
  }, index) {
    commit(types.SELECT_ITEM, index);
  },
  /**
   * 删除指定元素
   * @param {Number} id 被删除元素的id
   */
  async delItem({
    commit,
    dispatch,
    getters
  }, id) {
    await dispatch('cancelSelect');
    commit(types.DEL_ITEM, {
      id: id,
      page: getters.currentPage
    });
    /**
     * 调整z-index,  z-index从1开始，依次递增
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
   * @param {String} key 
   * @param {String} val 
   */
  updateMain({
    commit
  }, {
    key,
    val
  }) {
    commit(types.UPDATE_MAIN, {
      key: key,
      val: val
    })
  },
  /**
   * 打开指定panel
   */
  openPanel({
    commit
  }, type) {
    utils.openMask();
    commit(types.OPEN_PANEL, type)
  },
  /**
   * 关闭指定panel
   */
  closePanel({
    commit
  }, type) {
    utils.removeMask();
    commit(types.CLOSE_PANEL, type)
  }
}
