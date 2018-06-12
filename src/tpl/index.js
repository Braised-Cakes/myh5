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
        content,
        path
    }) {
        content = $(content);
        let width = Math.round(parseFloat(content.attr('width')));
        let height = Math.round(parseFloat(content.attr('height')));
        if (!content.attr('viewbox')) {
            content.attr('viewbox', `0 0 ${width} ${height}`);
        }
        content.attr('preserveAspectRatio', 'none');
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
        content.attr('width', '100%');
        content.attr('height', '100%');
        content = content.prop('outerHTML');
        return {
            type: types.SHAPE,
            content: content,
            class: types.SHAPE.toLowerCase(),
            animation: [],
            fill: {},
            width: width,
            height: height,
            path: path,
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
        return {
            type: types.IMAGE,
            path: path,
            originPath: path,
            crop : {},
            content: `<img style="width:100%;height:100%" src="${path}"/>`,
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
    },
    /*
    	图片
    */
    [types.QRCODE]: function ({
        url
    }) {
        let width = 200;
        let height = 200;
        return {
            type: types.QRCODE,
            content: `<img style="width:100%;height:100%" src="${url}"/>`,
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
