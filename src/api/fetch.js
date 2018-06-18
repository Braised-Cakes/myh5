import $ from 'jquery'

export default async function (url, data, type = 'GET') {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: 'json',
            data: type == 'GET' ? data : JSON.stringify(data),
            type: type,
            contentType: 'application/json; charset=UTF-8',
            xhrFields: {
                withCredentials: true
            },
            // crossDomain: true,
            success(rs) {
                //为登录
                if (rs.status == 2) {
                    document.location = '/login';
                    reject();
                } else {
                    resolve(rs);
                }
            }
        });
    })
}
