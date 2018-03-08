import {
    SAVE_ADDRESS
} from './mutation-types.js'

export default {

    async saveAddress({
        commit,
        state
    }) {
        commit(SAVE_ADDRESS, addres);
    },
}
