import Vue from 'vue'
import $ from 'jquery'
import store from '@/store/index.js'

Vue.directive('my-drag', {
    bind: function (el) {
        $(el).on('mousedown', function (ev) {
            if ($(ev.target).hasClass('circle')) {
                return;
            }
            let isMove = false;
            let old = [];
            let pos = [];
            for (let i = 0; i < store.getters.selectedItemsForArray.length; i++) {
                let item = store.getters.selectedItemsForArray[i];
                old.push({

                    x: parseInt($('#' + store.getters.currentPhone.data[item].id).css('left')),
                    y: parseInt($('#' + store.getters.currentPhone.data[item].id).css('top'))
                })
                pos.push({
                    x: 0,
                    y: 0
                })
            }
            let downLeft = ev.clientX;
            let downTop = ev.clientY;
            $(document).on('mousemove', function (ev) {
                isMove = true;
                for (let i = 0; i < store.getters.selectedItemsForArray.length; i++) {
                    let item = store.getters.selectedItemsForArray[i];
                    pos[i].x = ev.clientX - downLeft + old[i].x;
                    pos[i].y = ev.clientY - downTop + old[i].y;
                    $('.phone-area .phone-item').eq(item).css({
                        'left': pos[i].x + 'px',
                        'top': pos[i].y + 'px'
                    })
                }
                return false;
            });
            $(document).on('mouseup', function () {
                $(document).off('mousemove');
                $(document).off('mouseup');
                if (isMove) {
                    for (let i = 0; i < store.getters.selectedItemsForArray.length; i++) {
                        let item = store.getters.selectedItemsForArray[i];
                        store.dispatch('updateItem', {
                            key: 'style',
                            item: store.getters.currentPhone.data[item],
                            val: {
                                left: pos[i].x + 'px',
                                top: pos[i].y + 'px'
                            }
                        });
                    }
                }
            })
        })
    }
})
