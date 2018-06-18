import $ from 'jquery'
/**
 * 小数点后保留几位
 * @param {*} num 数字
 * @param {*} n   小数点后保留几位
 */
export const round = function (num, n = 2) {
  return Number(parseFloat(num).toFixed(n));
}
export const runAni = function (id, ani, aniIndex) {
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
  
  $('.' + id).css({
    'animation': str
  })
};
