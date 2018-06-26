import Vue from 'vue'
import $ from 'jquery'
import store from '@/store/index.js'

// 注册一个全局自定义指令 v-focus
// 注册（传入一个简单的指令函数）
Vue.directive('my-changesize', {
    bind: function (el, binding) {
        let minWidth = 1;
        let minHeight = 1;
        $(el).on('mousedown', (ev) => {
            let type = binding.value.type;
            let index;
            switch (type) {
                case 'nw':
                    index = 0;
                    break;
                case 'n':
                    index = 1;
                    break;
                case 'ne':
                    index = 2;
                    break;
                case 'w':
                    index = 3;
                    break;
                case 'e':
                    index = 4;
                    break;
                case 'sw':
                    index = 5;
                    break;
                case 's':
                    index = 6;
                    break;
                case 'se':
                    index = 7;
                    break;
            }
            let oParent = $(el).parents('.phone-item');
            let downX = ev.clientX;
            let downY = ev.clientY;
            let limitLeft, limitTop;
            let downLeft = Number($(oParent).css('left').slice(0, -2));
            let downTop = Number($(oParent).css('top').slice(0, -2));
            let downWidth = Number($(oParent).css('width').slice(0, -2));
            let downHeight = Number($(oParent).css('height').slice(0, -2));
            if (index == 0 || index == 1 || index == 2) {
                limitTop = downTop + downHeight - minHeight;
            }
            if (index == 5 || index == 6 || index == 7) {
                limitTop = downTop + minHeight;
            }
            if (index == 0 || index == 3 || index == 5) {
                limitLeft = downLeft + downWidth - minWidth;
            }
            if (index == 2 || index == 4 || index == 7) {
                limitLeft = downLeft + minWidth;
            }
            let ratio = parseInt($(oParent).css('width').slice(0, -2)) / Number($(oParent).css('height').slice(0, -2));
            $(document).on('mousemove', (ev) => {
                let mouseX = ev.clientX;
                let mouseY = ev.clientY;
                let moveX = mouseX - downX;
                let moveY = mouseY - downY;
                if (ratio) {
                    if (index == 0 || index == 7) {
                        moveX = moveY * ratio;
                    } else if (index == 2 || index == 5) {
                        moveX = -moveY * ratio;
                    }
                }
                let newLeft, newTop, newWidth, newHeight;
                if (index == 0 || index == 1 || index == 2) {
                    newTop = downTop + moveY;
                    newHeight = downHeight - moveY;
                }
                if (index == 2 || index == 4 || index == 7) {
                    newTop = downTop + moveY;
                    newWidth = downWidth + moveX;

                }
                if (index == 5 || index == 6 || index == 7) {
                    newTop = downTop + moveY;
                    newHeight = downHeight + moveY;
                }
                if (index == 0 || index == 3 || index == 5) {
                    newLeft = downLeft + moveX;
                    newWidth = downWidth - moveX;

                }

                if (newWidth < minWidth) {
                    newWidth = minWidth;
                    newLeft = limitLeft;
                }
                if (newHeight < minHeight) {
                    newHeight = minHeight;
                    newTop = limitTop;
                }
                let data = {};
                switch (index) {
                    case 0:

                        data = {
                            'left': newLeft,
                            'top': newTop,
                            'width': newWidth,
                            'height': newHeight
                        }

                        break;
                    case 1:
                        data = {
                            'top': newTop,
                            'height': newHeight
                        };
                        break;
                    case 2:

                        data = {
                            'top': newTop,
                            'height': newHeight,
                            'width': newWidth
                        };
                        break;
                    case 3:
                        data = {
                            'left': newLeft,
                            'width': newWidth
                        };
                        break;
                    case 4:
                        data = {
                            'width': newWidth
                        };
                        break;
                    case 5:
                        data = {
                            'left': newLeft,
                            'height': newHeight,
                            'width': newWidth
                        };
                        break;
                    case 6:
                        data = {
                            'height': newHeight
                        };

                        break;
                    case 7:
                        data = {
                            'height': newHeight,
                            'width': newWidth
                        };
                        break;
                    default:
                        break;
                }
                for (let attr in data) {
                    $(oParent).css(attr, data[attr] + 'px')
                }
            });
            $(document).on('mouseup', () => {
                $(document).off('mousemove');
                $(document).off('mouseup');
                store.dispatch('updateItem', {
                    key: 'style',
                    val: {
                        'left': $(oParent).css('left'),
                        'top': $(oParent).css('top'),
                        'width': $(oParent).css('width'),
                        'height': $(oParent).css('height'),
                    }
                })
            });
        });
    }
})
