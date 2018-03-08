const Client = require('ftp')
const c = new Client()
const path = require('path')
const cwd = process.cwd()
const config = require(path.resolve(cwd, 'qaep.config'))
const glob = require('glob')
// console.log(path.resolve(cwd, 'dist/index'), path.resolve(config.ftp.path, 'dist/index'));
// return;

function upload({
    source,
    target
}) {
    return new Promise((resolve, reject) => {
        c.put(source, target, function (err) {
            if (err) throw err
            resolve()
        });
    })
}


console.log(config.ftp.path)
module.exports = function () {
    return new Promise((resolve, reject) => {
        c.on('ready', function () {
            c.mkdir(path.resolve(config.ftp.path, 'index/img'), true, async(err) => {
                if (err) throw err;
                // c.put(path.resolve(cwd, 'dist/index'), path.resolve(config.ftp.path, 'dist/index'), function (err) {
                // if (err) throw err;
                var list = glob.sync(path.resolve(cwd, 'dist/index', '**'), {
                    nodir: true,
                    realpath: true
                })

                list = list.map((item) => {
                    // console.log(path.parse(item))
                    return {
                        source: item,
                        target: path.resolve(config.ftp.path, item.replace(cwd + '/dist/', () => {
                            return ''
                        }))
                    }
                })
                console.log(list)


                for (let i = 0; i < list.length; i++) {
                    await upload(list[i])
                }
                c.end();
                resolve()



                // });
            })
        });
        c.connect({
            host: 'bjyz-ps-dev374-herunfeng.epc.baidu.com',
            port: 8021,
            user: 'herunfeng',
            password: 'aabbcc123'
        });
    })
}