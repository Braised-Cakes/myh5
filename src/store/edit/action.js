import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'
import * as api from '@/api'
import tpl from '@/tpl'
import * as utils from '@/utils'
import config from '@/config'
import page from './action/page'
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
    }).then((res) => {
      commit(types.SET_PHONE, res.result.data.data);
      commit(types.OTHERINFO, res.result.data)
      //记录
      if (res.result.data.data) {
        dispatch('record', {
          type: 'phone',
          data: res.result.data.data.data
        })
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
      }



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
    commit(types.ADD_CREATED_ID)
    itemTpl.style['z-index'] = getters.curPageItemLen + 1;
    itemTpl.id = 'item_' + getters.phoneData.main.createdDomId;
    itemTpl.event = {};
    commit(types.ADD_ITEM, {
      currentPhone: getters.currentPhone,
      item: itemTpl
    });
    commit(types.SELECT_ITEM, getters.curPageItemLen - 1)

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
    getters,
    dispatch
  }, {
    key,
    val
  }) {
    commit(types.UPDATE_PHONE, {
      item: getters.currentPhone,
      key: key,
      val: val
    });
    dispatch('record', {
      type: 'item',
      data: getters.currentPhone,
      page: getters.currentPage
    })
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
    commit,
    getters
  }, index) {

    if (typeof index == 'number' && getters.hasSelectedMultiItems) {
      return;
    }
    if (typeof index == 'number') {
      commit(types.SELECT_ITEM, index);
    } else if (typeof index == 'object' && index.length == 1) {
      commit(types.SELECT_ITEM, index[0]);
    } else {
      commit(types.SELECT_ITEM, index);
    }
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
    let d = $.extend(true, [], getters.selectedItemsForArray)
    await dispatch('cancelSelect');
    if (!id) {
      for (let i = d.length - 1; i >= 0; i--) {
        commit(types.DEL_ITEM, {
          id: d[i],
          page: getters.currentPage
        });
      }
    }
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

  }
}
