import $ from 'jquery'
import store from '@/store/index.js'

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
    switch (ev.keyCode) {
        case 38:
            store.dispatch('updateItem', {
                key: 'style',
                val: {
                    'top': parseInt(store.getters.currentItem.style.top) - 1 + 'px'
                }
            });
            break;
        case 40:
            store.dispatch('updateItem', {
                key: 'style',
                val: {
                    'top': parseInt(store.getters.currentItem.style.top) + 1 + 'px'
                }
            });
            break;
        case 37:
            store.dispatch('updateItem', {
                key: 'style',
                val: {
                    'left': parseInt(store.getters.currentItem.style.left) - 1 + 'px'
                }
            });
            break;
        case 39:
            store.dispatch('updateItem', {
                key: 'style',
                val: {
                    'left': parseInt(store.getters.currentItem.style.left) + 1 + 'px'
                }
            });
            break;
    }
    console.log(ev.keyCode)
});
