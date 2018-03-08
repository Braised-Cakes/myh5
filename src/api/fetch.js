import $ from 'jquery'

export default async function ({
    url = '',
    data = {},
    type = 'GET',
    load = true
}) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: 'json',
            data: data,
            type: type,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
            },
            success(rs) {
                resolve(rs)
            }
        });
    })
}
