import * as types from './types.js'
import $ from 'jquery'
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
  	形状
  */
  [types.SHAPE]: function ({
    content
  }) {
    content = $(content);
    let width = Math.round(parseFloat(content.attr('width')));
    let height = Math.round(parseFloat(content.attr('height')));
    if (width >= height) {
      let radio = 100 / height;
      width = radio * width;
      height = 100;
    } else {
      let radio = 100 / width;
      height = radio * width;
      width = 100;
    }
    width = Math.round(width);
    height = Math.round(height);
    content.attr('width', width + 'px');
    content.attr('height', height + 'px');
    content = content.prop('outerHTML');
    return {
      type: types.SHAPE,
      content: content,
      class: types.SHAPE.toLowerCase(),
      animation: [],
      style: {
        position: 'absolute',
        left: '0',
        top: '50px',
        width: `${width}px`,
        height: `${height}px`,
        'border-style': 'solid'
      }
    }
  },
  /*
  	图片
  */
  [types.IMAGE]: function ({
    path,
    width,
    height
  }) {
    console.log(path)
    return {
      type: types.IMAGE,
      content: `<img src="${path}"/>`,
      class: types.IMAGE.toLowerCase(),
      animation: [],
      style: {
        position: 'absolute',
        left: '0',
        top: '50px',
        width: `${width}px`,
        height: `${height}px`,
        'border-style': 'solid'
      }
    }
  }
}
