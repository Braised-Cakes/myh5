import actions from './action'
import getters from './getters'
import mutations from './mutations'
import * as constant from '@/constant'
const state = {
    ...constant.initState
}
export default {
    state,
    getters,
    actions,
    mutations
}