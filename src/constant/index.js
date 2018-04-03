import $ from 'jquery'

export const BASE_BLANK = {
    main: {
        background: '#ffffff'
    },
    data: []
};

export const initState = {
    phone: {
        main: {
            createdDomId: 0
        },
        data: [$.extend(true, {}, BASE_BLANK)]
    },
    currentPage: 0,
    curItemId: -1
}
