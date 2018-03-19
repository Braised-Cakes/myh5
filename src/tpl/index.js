import $ from 'jquery'
import * as types from './types.js'
// import store from '../store/index.js'
export default {
    /*
    	文本
    */
    [types.TXT]: function () {
        return {
            type: types.TXT,
            content: '空白文本',
            class: types.TXT.toLowerCase(),
            style: {
                position:'absolute',
                left: '0',
                top: '50px',
                color: '#666666'
            }
        }
    }
}
