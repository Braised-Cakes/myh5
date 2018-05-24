import $ from 'jquery'
import * as types from '@/tpl/types'
export const BASE_BLANK = {
  main: {
    background: '#ffffff'
  },
  data: []
};

export const initState = {
  phone: {
    main: {
      createdDomId: 0,
      // music:{}
    },
    // music:{},
    data: [$.extend(true, {}, BASE_BLANK)]
  },
  currentPage: 0,
  curItemId: -1,
  curItemIds: [],
  otherInfo: {
    title: '',
    desc: ''
  },
  panel: {
    [types.SHAPE]: false,
    [types.MUSIC]: false,
    [types.IMAGE]: false,
    [types.QRCODE]: false,
  },
  cacheData: []
}


export const aniList = [{
  options: [{
    value: 'none',
    label: '无'
  }]
}, {
  label: '进入',
  options: [{
    value: 'fadeIn',
    label: '淡入'
  }, {
    value: 'fadeInLeft',
    label: '移入'
  }, {
    value: 'opacityFadeInLeft',
    label: '移入（透明度不变）'
  }]
}, {
  label: '退出',
  options: [{
    value: 'hinge',
    label: '悬挂脱落'
  }]
}]
