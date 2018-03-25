import actions from './action'
import getters from './getters'
import mutations from './mutations'
import $ from 'jquery'
import * as constant from '@/constant'
const initState = {
    phone: {
        main: {},
        data: [$.extend(true, {}, constant.BASE_BLANK)]
    },
    currentPage: 0
}
const state = {
    ...initState
}
export default {
    state,
    getters,
    actions,
    mutations
}
