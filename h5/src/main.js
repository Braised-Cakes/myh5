import 'minireset.css'
import $ from 'jquery'
import 'animate.css'
import * as utils from '../../utils/index'
// import * as api from '@/api/index'
new window.Swiper('.swiper-container', {
  direction: 'vertical',
  loop: true,
  on: {
    transitionStart() {
      $('.swiper-slide').eq(this.activeIndex).each((index, item) => {
        $(item).find('.items').each((index2, item2) => {
          $('.' + $(item2).attr('data-id')).css('animation', '');
          $('.' + $(item2).attr('data-id')).show();
          utils.runAni($(item2).attr('data-id'), JSON.parse($('.' + $(item2).attr('data-id')).attr('v-data')))
        })
      })
    },
    slideChangeTransitionEnd() {
    }
  }
});