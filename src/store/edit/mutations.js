import Vue from 'vue'
import $ from 'jquery'
import * as types from './mutation-types.js'
import * as constant from '@/constant'


/**
 * 修改作品数据,
 * 修改某一页的数据
 * 
 * 如果page存在， 代表修改某页的数据
 * 如果all存在， 代表修改整层数据
 * this.changeData(newVal)
 * this.changeData(newVal, page)
 * 
 * {
 *  main : {},
 *  data : [{
 *      main : {},
 *      data : []
 *  },{
 *      main : {},
 *      data : []
 *  }]
 * }
 * state.phone[type] = data;
 */
export default {
  [types.CHANGE_DATA](state, {
    data,
    page,
    all = false
  }) {
    data = $.extend(true, $.type(data) == 'array' ? [] : {}, data);
    if (page >= 0) {
      Vue.set(state.phone.data, page, data)
      // state.phone.data[page] = data;
    } else if (all) {
      Vue.set(state, 'phone', data)
      // state.phone = data;
    } else {
      Vue.set(state.phone, 'data', data)
      // state.phone.data = data;
    }
  },
  /**
   * 选择一页
   * @param {Number} page 页码
   */
  [types.SELECT_PAGE](state, page) {
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
  /**
   * 对phone赋值(页面初始化)
   */
  [types.SET_PHONE](state, payload) {
    if (!$.isEmptyObject(payload)) {
      state.phone = payload;
    } else {
      state.phone = $.extend(true, {}, constant.initState.phone);
    }
  },
  /**
   * 更新某个元素的main字段
   */
  [types.UPDATE_PHONE](state, {
    item,
    val
  }) {
    Vue.set(item, 'main', val)
  },
  /**
   * 添加元素
   */
  [types.ADD_ITEM](state, {
    currentPhone,
    item
  }) {
    currentPhone.data = currentPhone.data || [];
    currentPhone.data.push(item);
    Vue.set(currentPhone, 'data', currentPhone.data);
  },
  /**
   * 更新元素属性
   */
  [types.UPDATE_ITEM](state, {
    item,
    key,
    val,
    fill
  }) {
    if (key == 'style') {
      if (typeof val == 'string') {
        Vue.set(item, key, val);
      } else {
        for (const attr in val) {
          Vue.set(item[key], attr, val[attr]);
        }
      }
    } else {
      if (fill) {
        // let json = item['fill'] || {};
        // json[fill] = val.css;
        console.log(val);
        Vue.set(item['fill'], fill, val);
        Vue.set(item, key, $(item.content).find(`*[fill="${fill}"]`).css('fill', val).parents('svg').prop('outerHTML'));
      } else {
        console.log(item);
        console.log(key);
        console.log(val)
        if (typeof val == 'string') {
          Vue.set(item, key, val);
        } else {
          if (!item[key]) {
            Vue.set(item, key, {});
          }
          for (const attr in val) {
            console.log(attr);
            Vue.set(item[key], attr, val[attr]);
          }
        }
      }
    }

  },
  /**
   * 选择元素
   */
  [types.SELECT_ITEM](state, index) {
    state.curItemId = index;
  },
  /**
   * 删除元素
   */
  [types.DEL_ITEM](state, {
    curItemId,
    curPageId
  }) {
    state.phone.data[curPageId].data.splice(curItemId, 1)
  },
  [types.ADD_CREATED_ID](state) {
    state.phone.main.createdDomId++;
  },
  /**
   * 打开panel
   */
  [types.OPEN_PANEL](state, type) {
    state.panel[type] = true;
  },
  /**
   * 关闭panel
   */
  [types.CLOSE_PANEL](state, type) {
    state.panel[type] = false;
  },
  /**
   * 更新phone的main字段
   */
  [types.UPDATE_MAIN](state, {
    key,
    val
  }) {
    Vue.set(state.phone.main, key, val);
  }
}
