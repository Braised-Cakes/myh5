import $ from 'jquery'
//保留n位小树
export const round = function (num, index = 2) {
    return Number(parseFloat(num).toFixed(index));
}


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
            `${aniName} ${aniDuration}s ${round(delay + round(aniDelay, 1), 1)}s`;
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
