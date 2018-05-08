import $ from 'jquery'
import routes from '@/router'
export default async function (url, data, type = 'GET') {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      dataType: 'json',
      data: type == 'GET' ? data : JSON.stringify(data),
      type: type,
      contentType: 'application/json; charset=UTF-8',
      success(rs) {
        //为登录
        if (rs.status == 2) {
          routes.push({
            name : 'login',
            params : {
              status : 2
            }
          });
          reject()
          // resolve(rs);
        } else {

          resolve(rs)


        }

      }
    });
  })
}
