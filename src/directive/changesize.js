import Vue from 'vue'
import $ from 'jquery'
import store from '@/store/index.js'

// 注册一个全局自定义指令 v-focus
// 注册（传入一个简单的指令函数）
Vue.directive('my-changesize', {
  bind: function (el, binding) {
    var x, y, width, height;
    $(el).on('mousedown', (ev) => {
      var type = binding.value.type;
      var item = $(el).parents('.phone-item');
      //   console.log(item)
      var initLeft = x = $(item).position().left;
      var initTop = y = $(item).position().top;
      var initWidth = width = parseInt($(item).css('width'));
      var initHeight = height = parseInt($(item).css('height'));
      var initX = ev.clientX;
      var initY = ev.clientY;
      console.log(initLeft)
      $(document).on('mousemove', (ev) => {
        x = initLeft + ev.clientX - initX;
        y = ev.clientY - initY + initTop;

        let a = ev.clientX - initX;
        let b = ev.clientY - initY;
        if(a > b){
            b = a;
        }else{
            a = b;
        }
        width = initWidth + a;
        height = initHeight + b;
        // width = initWidth + ev.clientX - initX;
        // height = initHeight + ev.clientY - initY;




        //右上，右下
        if (type == 'ne' || type == 'se') {
          x = initLeft;
        }
        //左下，右下
        if (type == 'sw' || type == 'se') {
          y = initTop;
        }
        //左上，右上
        if (type == 'nw' || type == 'ne') {
          y = initTop + (ev.clientY - initY);
          height = initHeight + (-ev.clientY + initY);
          if (y >= initTop + initHeight) {
            y = initTop + initHeight;
          }
        }
        //左上，左下
        if (type == 'nw' || type == 'sw') {
          width = initWidth + (-ev.clientX + initX);
          if (x >= initLeft + initWidth) {
            x = initLeft + initWidth;
          }
        }
        console.log(x)
        $(item).css({
          'left': x + 'px',
          'top': y + 'px',
          'width': width + 'px',
          'height': height + 'px'
        });
      });
      $(document).on('mouseup', () => {
        $(document).off('mousemove');
        $(document).off('mouseup');
        store.dispatch('updateItem', {
          key: 'style',
          val: {
            'left': x + 'px',
            'top': y + 'px',
            'width': width + 'px',
            'height': height + 'px'
          }
        })
      });
    });
  }
})
