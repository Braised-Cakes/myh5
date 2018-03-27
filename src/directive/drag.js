import Vue from 'vue'
import $ from 'jquery'
import store from '@/store/index.js'
Vue.directive('my-drag', {
    bind: function (el) {
        $(el).on('mousedown', function (ev) {
            if ($(ev.target).hasClass('ui-resizable-handle')) {
                return;
            }
            let isMove = false;
            let old = {};
            old.x = parseInt($(this).css('left'));
            old.y = parseInt($(this).css('top'));
            let downLeft = ev.clientX;
            let downTop = ev.clientY;
            let x, y;
            $(document).on('mousemove', function (ev) {
                isMove = true;
                x = ev.clientX - downLeft + old.x;
                y = ev.clientY - downTop + old.y;
                $('.phone-area .phone-item').eq(store.getters.curItemId).css({
                    'left': x + 'px',
                    'top': y + 'px'
                })
                return false;
            });
            $(document).on('mouseup', function () {
                $(document).off('mousemove');
                $(document).off('mouseup');
                if (isMove) {
                    store.dispatch('updateItem', {
                        key: 'style',
                        val: {
                            left: x + 'px',
                            top: y + 'px'
                        }
                    });
                }
            })
        })
    }
})
