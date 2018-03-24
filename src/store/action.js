import * as types from './mutation-types.js'
import * as api from '@/api/index'
import $ from 'jquery'
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
        api.getEdit({
            id: id
        }).then((res) => {
            commit(types.SET_PHONE, res.result.data.data);
        })
    },
}
