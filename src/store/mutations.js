import * as types from './mutation-types.js'
import $ from 'jquery'
const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
};

export default {
    [types.SET_PHONE](state, payload) {
        if (!$.isEmptyObject(payload)) {
            state.phone = payload;
        } else {
            state.phone = {
                main: {},
                data: [$.extend(true, {}, BASE_BLANK)]
            }
        }
    },
}
