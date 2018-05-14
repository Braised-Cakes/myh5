import * as types from '../mutation-types.js'
import * as utils from '@/utils'
export default {
  /**
   * 打开指定panel
   */
  openPanel({
    commit
  }, type) {
    utils.openMask();
    commit(types.OPEN_PANEL, type)
  },
  /**
   * 关闭指定panel
   */
  closePanel({
    commit
  }, type) {
    utils.removeMask();
    commit(types.CLOSE_PANEL, type)
  }
}
