module.exports = {
    devServer: {
        proxy: {
            '/aj': {
                target: 'http://localhost:3000', // 你接口的域名
                secure: true,
                changeOrigin: true
            },
            '/store': {
                target: 'http://localhost:3000', // 你接口的域名
                secure: true,
                changeOrigin: true
            },
            // '/svg': {
            //   target: 'http://p7d4z759a.bkt.clouddn.com', // 你接口的域名
            //   secure: true,
            //   changeOrigin: true
            // }
        }
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // art-template options (if necessary)
                    // @see https://github.com/aui/art-template
                }
            }]
        }
    }
}
