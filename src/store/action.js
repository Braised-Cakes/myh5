import * as types from './mutation-types.js'
import * as api from '@/api/index'
import $ from 'jquery'
console.log(types)
export default {
    setPhone({
        commit,
        state,
        rootState,
        getters,
        dispatch
    }, {
        id
    }) {
        console.log(id)
        api.getEdit({
            id: id
        }).then((res) => {
            console.log(res)
            if (!$.isEmptyObject(res.result.data.data)) {
                commit(types.SET_PHONE, res.result.data.data);
            }
        })
    },
}
