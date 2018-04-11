import * as types from './types.js'
export default {
  /*
  	文本
  */
  [types.TXT]: function () {
    return {
      type: types.TXT,
      content: '空白文本',
      class: types.TXT.toLowerCase(),
      animation: [],
      style: {
        position: 'absolute',
        left: '0',
        top: '50px',
        color: '#666666',
        width: '200px',
        height: '100px',
        padding: '5px',
        'border-style': 'solid'
      }
    }
  },
  /*
  	文本
  */
  [types.SHAPE]: function () {
    return {
      type: types.SHAPE,
      content: '',
      class: types.SHAPE.toLowerCase(),
      animation: [],
      style: {
        position: 'absolute',
        left: '0',
        top: '50px',
        width: '200px',
        height: '100px',
        'border-style': 'solid'
      }
    }
  }
}
