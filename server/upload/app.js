// const superagent = require('superagent')
// const fs = require('fs')
// superagent.post('http://store.eqxiu.com/api/category/getCategoryListById?id=889875').set("Cookie", '_ga=GA1.2.1844039418.1523173010; gr_user_id=856b28d3-7797-4ad3-bf0a-e970d2d29855; _gid=GA1.2.1183794952.1523282172; _tracker_distinct_id_=5d3727a1-f0a8-457d-9fbe-47317c4011b7; _tracker_session_id_=6915a5f5-2f33-4892-afca-d78fa7b039f7; _tracker_user_id_=4a2d8af950851f490150ef39910e18f1; UM_distinctid=162be364ec91054-02381f8078fd39-33697b04-1fa400-162be364eca1bb; rememberMe=DLcTdZGZXkAzMHU5jjaPN1v2Z6yk2xDAZWR4mm5v8zCdN91USpyM8T0IGwdxQTgxjjFv43XARdAD/hDJO9G1jiIHpv8TowKQlY4E9+yh5+AVPew0MzTHiqFdAnUhElwhcAgjaecr6Lvi49oJhxc7hBg7Nj0yJc5a6wdZyBPVJCpReJ8NrDlzEpTiuzmh0n+/4nbSMEV8wshWBPOxXtMA6lON+OgitiGHFLNVc28x6oqn/yYYWrPA/VjqJU/IRkI5mtlB4Lvtba+ZblokqnQ5QGLOxTknUZ2/VyPH+2IXomiOx56gjSQ/GO8ZO4oenIBmp3kCFh0+wZqwDHkwcojLQxuPv1w9B96gqwFJUO3IU5NJpC2kf/2vCbb/a4TmpA31GmwCQpaX5XHxHaTKfO6bN20FEvTo0wy9Q/4mcSVJoihzySyOGAVYElXKqvqcYAQpyUT8XQ/FwL7STpcHxoHkGuP91fOVbXw0l7WbjtG6dADEZ3qV24TkNgqulqUdFi1tXk46dB54EEbToGoa33eZbwK1qtFRtujaZVY9088ImXQkrZV0K2dyJJkDfhTbyteFIG3MnZfjxBm4IwagzOE0uhR39bSRBQaZZGLJ2dnRgHhMowPDnLcGNWCHTBIISLw0Rjj7qY9lLHyfprfN3uet/iPvVoIHMzXxDf4l0w3m5Wp7cw/akurO4JTZMl+9iAuJY0gmvGHImXfz7W3XuEfNoP9nKPCtNVj4ewLE8FoDIjKlejDaUsR3R+2peNRJ4XGzAUysUU0JklxzlBfq3pKzWRtb4RGmFTz8+CtJQnTdocQ6V5ZC96BCSQ1gljLjzfG8JDxQ7Wj0KxUmMwC8+6L495Xg8iowmWyYdv7AHI8ippkAdkjeJ5oPsVxG4KdhD7gf2TACM5KgcezXx89tR1pMo0GDhJOWWO3PoEOCZPWbaLFEHd6vh5jyLDraUWi8KqW5MvB7pAuqqhe2Ftq2/qFwVU+xVCTpWYSUfAfNHDfGp2yomKcMckkdh5IJALDmRKvGiBSRfo/v2Q9GOGlb9PaT4gqudN2FWFWORhk0Y4Q3WW9EP++7sGOyIhjfBXf1amphc2BZG0YumdJIQoghz9FPcopQsa2HCtHF+kWuTDutVQOWAc5TcAApAMwakrYEeyyUqVFKJwZlVvu6rvpwA3+Ji3VvW2pDWsREHo5cYGLrb2KY5yffRfEUvANargC79qzamx4e5Zn3vJBsa5DjNrv46lWSEbOwj+edsYYUBHRi8GFFGA02MCpimqWls76witVUwHE5BLYA379ZP35HMr11wwmIgvIVvr76tRbMydVFKsoO5qbSbkfnD1YNtfjoqSB84OCwlrUkNU3TKXnhjnFvOg==; _tracker_launch_=1; JSESSIONID=87f8dac50f5443b3a643addcbc60dc84; gr_session_id_a17a66c1107ba80b=6aaada5d-7096-4d1a-82db-c5b19f30cf06; _gat=1').set({
//   "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
//   'Content-Type': 'application/x-www-form-urlencoded'
// }).end(async function (err, res) {
//   //   console.log(res.body.list)
//   let list = res.body.list;
//   for (let i = 0; i < list.length; i++) {
//     fs.appendFileSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/musics/${list[i].name}.json`, '');
//     // break;
//     for (let j = 0; j < 1000; j++) {
//       let data = await fn(j + 1, list[i].id);
//       if (!data || data.length == 0) {
//         break;
//       } else {
//         let originData = [];
//         if (fs.existsSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/musics/${list[i].name}.json`)) {
//           let docs = fs.readFileSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/musics/${list[i].name}.json`, 'utf-8');
//           if (docs.trim() == '') {
//             docs = '[]'
//           }
//           originData = JSON.parse(docs);
//         }
//         originData.push(...data)

//         fs.writeFileSync(`/Users/BraisedCakes/Desktop/2018/myh5-store/musics/${list[i].name}.json`, JSON.stringify(originData, null, 4));
//         console.log(`当前type = ${list[i].name}, page = ${j+1}`)
//       }
//     }
//   }
// });


// function fn(page, id) {
//   return new Promise((resolve) => {
//     superagent.get(`http://store.eqxiu.com/api/product/cat/listProdByCate?attrGroupId=3&category=${id}&pageNo=${page}&pageSize=10`).set("Cookie", '_ga=GA1.2.1844039418.1523173010; gr_user_id=856b28d3-7797-4ad3-bf0a-e970d2d29855; _gid=GA1.2.1183794952.1523282172; _tracker_distinct_id_=5d3727a1-f0a8-457d-9fbe-47317c4011b7; _tracker_session_id_=6915a5f5-2f33-4892-afca-d78fa7b039f7; _tracker_user_id_=4a2d8af950851f490150ef39910e18f1; UM_distinctid=162be364ec91054-02381f8078fd39-33697b04-1fa400-162be364eca1bb; rememberMe=DLcTdZGZXkAzMHU5jjaPN1v2Z6yk2xDAZWR4mm5v8zCdN91USpyM8T0IGwdxQTgxjjFv43XARdAD/hDJO9G1jiIHpv8TowKQlY4E9+yh5+AVPew0MzTHiqFdAnUhElwhcAgjaecr6Lvi49oJhxc7hBg7Nj0yJc5a6wdZyBPVJCpReJ8NrDlzEpTiuzmh0n+/4nbSMEV8wshWBPOxXtMA6lON+OgitiGHFLNVc28x6oqn/yYYWrPA/VjqJU/IRkI5mtlB4Lvtba+ZblokqnQ5QGLOxTknUZ2/VyPH+2IXomiOx56gjSQ/GO8ZO4oenIBmp3kCFh0+wZqwDHkwcojLQxuPv1w9B96gqwFJUO3IU5NJpC2kf/2vCbb/a4TmpA31GmwCQpaX5XHxHaTKfO6bN20FEvTo0wy9Q/4mcSVJoihzySyOGAVYElXKqvqcYAQpyUT8XQ/FwL7STpcHxoHkGuP91fOVbXw0l7WbjtG6dADEZ3qV24TkNgqulqUdFi1tXk46dB54EEbToGoa33eZbwK1qtFRtujaZVY9088ImXQkrZV0K2dyJJkDfhTbyteFIG3MnZfjxBm4IwagzOE0uhR39bSRBQaZZGLJ2dnRgHhMowPDnLcGNWCHTBIISLw0Rjj7qY9lLHyfprfN3uet/iPvVoIHMzXxDf4l0w3m5Wp7cw/akurO4JTZMl+9iAuJY0gmvGHImXfz7W3XuEfNoP9nKPCtNVj4ewLE8FoDIjKlejDaUsR3R+2peNRJ4XGzAUysUU0JklxzlBfq3pKzWRtb4RGmFTz8+CtJQnTdocQ6V5ZC96BCSQ1gljLjzfG8JDxQ7Wj0KxUmMwC8+6L495Xg8iowmWyYdv7AHI8ippkAdkjeJ5oPsVxG4KdhD7gf2TACM5KgcezXx89tR1pMo0GDhJOWWO3PoEOCZPWbaLFEHd6vh5jyLDraUWi8KqW5MvB7pAuqqhe2Ftq2/qFwVU+xVCTpWYSUfAfNHDfGp2yomKcMckkdh5IJALDmRKvGiBSRfo/v2Q9GOGlb9PaT4gqudN2FWFWORhk0Y4Q3WW9EP++7sGOyIhjfBXf1amphc2BZG0YumdJIQoghz9FPcopQsa2HCtHF+kWuTDutVQOWAc5TcAApAMwakrYEeyyUqVFKJwZlVvu6rvpwA3+Ji3VvW2pDWsREHo5cYGLrb2KY5yffRfEUvANargC79qzamx4e5Zn3vJBsa5DjNrv46lWSEbOwj+edsYYUBHRi8GFFGA02MCpimqWls76witVUwHE5BLYA379ZP35HMr11wwmIgvIVvr76tRbMydVFKsoO5qbSbkfnD1YNtfjoqSB84OCwlrUkNU3TKXnhjnFvOg==; _tracker_launch_=1; JSESSIONID=87f8dac50f5443b3a643addcbc60dc84; gr_session_id_a17a66c1107ba80b=6aaada5d-7096-4d1a-82db-c5b19f30cf06; _gat=1').set({
//       "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }).end(function (err, res) {
//       setTimeout(() => {
//         resolve(res.body.list)
//       }, 500)
//     });
//   })
// }
