import 'minireset.css'
import $ from 'jquery'
import 'animate.css'
import * as utils from '../../utils/index'
new window.Swiper('.swiper-container', {
  direction: 'vertical',
  loop: true,
  on: {
    transitionStart() {
      // console.log(this.activeIndex); //
      // console.log(1)

      console.log(this.activeIndex)
      // $('.swiper-slide').eq(this.activeIndex).each((index, item) => {
      //   $(item).find('.items').each((index2, item2) => {
      //     // console.log(item2)
      //     $('.' + $(item2).attr('data-id')).css('animation', '');
      //     $('.' + $(item2).attr('data-id')).show();
      //     // console.log($(item2).attr(''));
      //     utils.runAni($(item2).attr('data-id'), JSON.parse($('.' + $(item2).attr('data-id')).attr('v-data')))
      //   })
      // })


      // utils.runAni('item_20', JSON.parse($('.item_20').attr('v-data')))

    },

    slideChangeTransitionEnd() {
      // alert(1)
      // console.log(2)
      // console.log(this.activeIndex)
      // $('.swiper-slide').each((index, item)=>{
      //   if(index != this.activeIndex && index != this.activeIndex + 1 && index != this.activeIndex -1){
      //     $(item).find('.items').hide();
      //   }
      // })
    }
  }
});




// console.log($('#item_20').attr('v-data'));


// setTimeout(() => {

//   utils.runAni('item_20', JSON.parse($('#item_20').attr('v-data')))
// }, 2000)
