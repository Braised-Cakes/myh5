import $ from 'jquery'

export default async function (url, data, type = 'GET') {
    return new Promise((resolve) => {
        $.ajax({
            url: url,
            dataType: 'json',
            data: type == 'GET' ? data : JSON.stringify(data),
            type: type,
            // beforeSend: function (XMLHttpRequest) {
            //     XMLHttpRequest.setRequestHeader("Content-Type", "application/json");
                
            // },
            contentType:'application/json; charset=UTF-8',
            success(rs) {
                resolve(rs)
            }
        });
    })
}
