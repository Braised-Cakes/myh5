import $ from 'jquery'
import store from '@/store/index.js'
const keyCode = {
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  delete: 8
}

$(window).keydown(function (ev) {
  if (document.activeElement != document.querySelector('body')) {
    return;
  }
  /**
   * up 38
   * down 40
   * left 37
   * right 39
   */
  if (!store.getters.hasSelectedItems) {
    return;
  }
  switch (ev.keyCode) {
    case keyCode.up:
      store.dispatch('updateItem', {
        key: 'style',
        val: {
          'top': parseInt(store.getters.curItem.style.top) - 1 + 'px'
        }
      });
      break;
    case keyCode.down:
      store.dispatch('updateItem', {
        key: 'style',
        val: {
          'top': parseInt(store.getters.curItem.style.top) + 1 + 'px'
        }
      });
      break;
    case keyCode.left:
      store.dispatch('updateItem', {
        key: 'style',
        val: {
          'left': parseInt(store.getters.curItem.style.left) - 1 + 'px'
        }
      });
      break;
    case keyCode.right:
      store.dispatch('updateItem', {
        key: 'style',
        val: {
          'left': parseInt(store.getters.curItem.style.left) + 1 + 'px'
        }
      });
      break;
    case keyCode.delete:
      store.dispatch('delItem')
      break;
  }
});
