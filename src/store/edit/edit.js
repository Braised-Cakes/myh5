import actions from './action'
import getters from './getters'
import mutations from './mutations'
import $ from 'jquery'
const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
};
const initState = {
    phone: {
        main: {},
        data: [$.extend(true, {}, BASE_BLANK)]
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
