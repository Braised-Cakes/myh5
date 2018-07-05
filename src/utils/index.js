import $ from 'jquery'
import store from '@/store/index'

/**
 * 小数点后保留几位
 * @param {*} num 数字
 * @param {*} n   小数点后保留几位
 */
export const round = function (num, n = 2) {
    return Number(parseFloat(num).toFixed(n));
}
/**
 * 执行当前页动画
 */
export const runCurPhoneAni = function (delay) {
    store.getters.currentPhone.data.forEach((item) => {
        if (delay) {
            runAni(item.id, item.animation);
        } else {
            runAni(item.id, item.animation, null, 1);
        }

    });
}
/**
 * 执行动画
 * @param {*} id 元素id
 * @param {*} ani 元素animation列表
 * @param {*} aniIndex 取animation中第几个？
 * @param {*} time 是否存在setTimeout
 */
export const runAni = function (id, ani, aniIndex, time) {
    let str = '';
    let delay = 0;
    ani.forEach(($item, $index) => {
        let aniName = $item['animation-name'];
        let aniDuration = $item['animation-duration'];
        let aniDelay = $item['animation-delay'];
        if (typeof aniIndex == 'number' && aniIndex != $index) {
            return;
        } else if (typeof aniIndex != 'number' && $index > 0) {
            str += ','
        }
        str = str +
            `${aniName} ${aniDuration}s ${round(delay + round(aniDelay, 1), 1)}s 1 normal`;
        delay += round(parseFloat(aniDelay) + parseFloat(aniDuration), 1);
    });
    if (time) {
        $('#' + id + ' .item-body').css({
            'animation': str
        })
    } else {
        $('#' + id + ' .item-body').css({
            'animation': '',
            'animation-play-state': 'paused'
        });
        setTimeout(() => {
            $('#' + id + ' .item-body').css({
                'animation': str
            });
        }, 30);
    }
};


export const openMask = function () {
    if (!$('.mask').length) {
        $('body').append('<div class="my-mask"></div>');
    }
}
export const removeMask = function () {
    $('.my-mask').remove();
}
