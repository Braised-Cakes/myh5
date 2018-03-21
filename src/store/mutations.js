import * as types from './mutation-types.js'


export default {
    //删除地址列表
    [types.SET_PHONE](state, payload) {
        state.phone = payload;
        // currentPhone.data = currentPhone.data || [];
        // currentPhone.data.push(item);
        // Vue.set(currentPhone, 'data', currentPhone.data);
        // state.currentItemId = currentPhone.data.length - 1;
    },
}
