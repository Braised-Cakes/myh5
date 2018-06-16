import $ from 'jquery'
import * as types from '@/tpl/types'
export const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
};

export const initState = {
    phone: {
        main: {
            createdDomId: 0,
            // music:{}
        },
        // music:{},
        data: [$.extend(true, {}, BASE_BLANK)]
    },
    currentPage: 0,
    curItemId: -1,
    curItemIds: [],
    otherInfo: {
        title: '',
        desc: ''
    },
    panel: {
        [types.SHAPE]: false,
        [types.MUSIC]: false,
        [types.IMAGE]: false,
        [types.QRCODE]: false,
        'SET': false,
    },
    cacheData: []
}


export const aniList = [{
    options: [{
        value: 'none',
        label: '无'
    }]
}, {
    "label": "Attention Seekers",
    "options": [{
        "value": "bounce",
        "label": "bounce"
    }, {
        "value": "flash",
        "label": "flash"
    }, {
        "value": "pulse",
        "label": "pulse"
    }, {
        "value": "rubberBand",
        "label": "rubberBand"
    }, {
        "value": "shake",
        "label": "shake"
    }, {
        "value": "swing",
        "label": "swing"
    }, {
        "value": "tada",
        "label": "tada"
    }, {
        "value": "wobble",
        "label": "wobble"
    }, {
        "value": "jello",
        "label": "jello"
    }]
}, {
    "label": "Bouncing Entrances",
    "options": [{
        "value": "bounceIn",
        "label": "bounceIn"
    }, {
        "value": "bounceInDown",
        "label": "bounceInDown"
    }, {
        "value": "bounceInLeft",
        "label": "bounceInLeft"
    }, {
        "value": "bounceInRight",
        "label": "bounceInRight"
    }, {
        "value": "bounceInUp",
        "label": "bounceInUp"
    }]
}, {
    "label": "Bouncing Exits",
    "options": [{
        "value": "bounceOut",
        "label": "bounceOut"
    }, {
        "value": "bounceOutDown",
        "label": "bounceOutDown"
    }, {
        "value": "bounceOutLeft",
        "label": "bounceOutLeft"
    }, {
        "value": "bounceOutRight",
        "label": "bounceOutRight"
    }, {
        "value": "bounceOutUp",
        "label": "bounceOutUp"
    }]
}, {
    "label": "Fading Entrances",
    "options": [{
        "value": "fadeIn",
        "label": "fadeIn"
    }, {
        "value": "fadeInDown",
        "label": "fadeInDown"
    }, {
        "value": "fadeInDownBig",
        "label": "fadeInDownBig"
    }, {
        "value": "fadeInLeft",
        "label": "fadeInLeft"
    }, {
        "value": "fadeInLeftBig",
        "label": "fadeInLeftBig"
    }, {
        "value": "fadeInRight",
        "label": "fadeInRight"
    }, {
        "value": "fadeInRightBig",
        "label": "fadeInRightBig"
    }, {
        "value": "fadeInUp",
        "label": "fadeInUp"
    }, {
        "value": "fadeInUpBig",
        "label": "fadeInUpBig"
    }]
}, {
    "label": "Fading Exits",
    "options": [{
        "value": "fadeOut",
        "label": "fadeOut"
    }, {
        "value": "fadeOutDown",
        "label": "fadeOutDown"
    }, {
        "value": "fadeOutDownBig",
        "label": "fadeOutDownBig"
    }, {
        "value": "fadeOutLeft",
        "label": "fadeOutLeft"
    }, {
        "value": "fadeOutLeftBig",
        "label": "fadeOutLeftBig"
    }, {
        "value": "fadeOutRight",
        "label": "fadeOutRight"
    }, {
        "value": "fadeOutRightBig",
        "label": "fadeOutRightBig"
    }, {
        "value": "fadeOutUp",
        "label": "fadeOutUp"
    }, {
        "value": "fadeOutUpBig",
        "label": "fadeOutUpBig"
    }]
}, {
    "label": "Flippers",
    "options": [{
        "value": "flip",
        "label": "flip"
    }, {
        "value": "flipInX",
        "label": "flipInX"
    }, {
        "value": "flipInY",
        "label": "flipInY"
    }, {
        "value": "flipOutX",
        "label": "flipOutX"
    }, {
        "value": "flipOutY",
        "label": "flipOutY"
    }]
}, {
    "label": "Lightspeed",
    "options": [{
        "value": "lightSpeedIn",
        "label": "lightSpeedIn"
    }, {
        "value": "lightSpeedOut",
        "label": "lightSpeedOut"
    }]
}, {
    "label": "Rotating Entrances",
    "options": [{
        "value": "rotateIn",
        "label": "rotateIn"
    }, {
        "value": "rotateInDownLeft",
        "label": "rotateInDownLeft"
    }, {
        "value": "rotateInDownRight",
        "label": "rotateInDownRight"
    }, {
        "value": "rotateInUpLeft",
        "label": "rotateInUpLeft"
    }, {
        "value": "rotateInUpRight",
        "label": "rotateInUpRight"
    }]
}, {
    "label": "Rotating Exits",
    "options": [{
        "value": "rotateOut",
        "label": "rotateOut"
    }, {
        "value": "rotateOutDownLeft",
        "label": "rotateOutDownLeft"
    }, {
        "value": "rotateOutDownRight",
        "label": "rotateOutDownRight"
    }, {
        "value": "rotateOutUpLeft",
        "label": "rotateOutUpLeft"
    }, {
        "value": "rotateOutUpRight",
        "label": "rotateOutUpRight"
    }]
}, {
    "label": "Sliding Entrances",
    "options": [{
        "value": "slideInUp",
        "label": "slideInUp"
    }, {
        "value": "slideInDown",
        "label": "slideInDown"
    }, {
        "value": "slideInLeft",
        "label": "slideInLeft"
    }, {
        "value": "slideInRight",
        "label": "slideInRight"
    }]
}, {
    "label": "Sliding Exits",
    "options": [{
        "value": "slideOutUp",
        "label": "slideOutUp"
    }, {
        "value": "slideOutDown",
        "label": "slideOutDown"
    }, {
        "value": "slideOutLeft",
        "label": "slideOutLeft"
    }, {
        "value": "slideOutRight",
        "label": "slideOutRight"
    }]
}, {
    "label": "Zoom Entrances",
    "options": [{
        "value": "zoomIn",
        "label": "zoomIn"
    }, {
        "value": "zoomInDown",
        "label": "zoomInDown"
    }, {
        "value": "zoomInLeft",
        "label": "zoomInLeft"
    }, {
        "value": "zoomInRight",
        "label": "zoomInRight"
    }, {
        "value": "zoomInUp",
        "label": "zoomInUp"
    }]
}, {
    "label": "Zoom Exits",
    "options": [{
        "value": "zoomOut",
        "label": "zoomOut"
    }, {
        "value": "zoomOutDown",
        "label": "zoomOutDown"
    }, {
        "value": "zoomOutLeft",
        "label": "zoomOutLeft"
    }, {
        "value": "zoomOutRight",
        "label": "zoomOutRight"
    }, {
        "value": "zoomOutUp",
        "label": "zoomOutUp"
    }]
}, {
    "label": "Specials",
    "options": [{
        "value": "hinge",
        "label": "hinge"
    }, {
        "value": "jackInTheBox",
        "label": "jackInTheBox"
    }, {
        "value": "rollIn",
        "label": "rollIn"
    }, {
        "value": "rollOut",
        "label": "rollOut"
    }]
}]
