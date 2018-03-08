import {

    SAVE_ADDRESS,
} from './mutation-types.js'


export default {
    //删除地址列表
    [SAVE_ADDRESS](state, newAdress) {
        state.removeAddress = newAdress
    }

}
