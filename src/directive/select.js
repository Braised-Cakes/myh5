import Vue from 'vue'
import $ from 'jquery'
import store from '../store/index.js'

Vue.directive('my-select', {
    inserted() {
        $('body').append($('<div id="j-choice-box"></div>'))
        $('#j-choice-box').css({
            position: 'absolute',
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            border: '1px solid #000',
            display: 'none',
            'z-index': 9999,
            background: 'rgba(0,0,0,0.3)'
        })
    },
    bind: function (el) {
        $(el).on('mousedown', (ev) => {
            let arr = store.getters.currentPhone.data;
            let oldX = ev.clientX;
            let oldY = ev.clientY;
            let x, y, w, h;
            $('#j-choice-box').show();
            const {
                left: phoneLeft,
                top: phoneTop
            } = $('.workspace').offset();
            $(document).on('mousemove', (ev) => {
                let nowX = ev.clientX;
                let nowY = ev.clientY;
                if (nowX > oldX) {
                    x = oldX;
                    w = nowX - oldX;
                } else {
                    x = nowX;
                    w = oldX - nowX;
                }
                if (nowY > oldY) {
                    y = oldY;
                    h = nowY - oldY;
                } else {
                    y = nowY;
                    h = oldY - nowY;
                }
                $('#j-choice-box').css({
                    left: x + 'px',
                    top: y + 'px',
                    width: w + 'px',
                    height: h + 'px',
                });
                var list = [];
                arr.forEach((item, index) => {
                    var {
                        left,
                        top,
                        width,
                        height
                    } = item.style;
                    left = $('#' + item.id).offset().left - phoneLeft;
                    top = $('#' + item.id).offset().top - phoneTop;
                    width = parseFloat(width);
                    height = parseFloat(height);

                    if (phoneLeft + left > x + w || phoneLeft + left + width < x || phoneTop + top > y + h || phoneTop + top + height < y) {
                        // console.log(';')
                    } else {
                        list.push(index);
                    }
                })
                store.dispatch('selectItem', list)
            })
            $(document).on('mouseup', () => {
                $(document).off('mousemove');
                $(document).off('mouseup');
                $('#j-choice-box').css({
                    'display': 'none',
                    'width': 0,
                    'height': 0,
                    'left': 0,
                    'top': 0
                })
            })
        });
    }
})
