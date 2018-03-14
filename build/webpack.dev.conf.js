'use strict'
const utils = require('./utils')
const webpack = require('webpack')
// const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const opn = require('opn')
const argv = require('yargs').argv
const cwd = process.cwd()
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const path = require('path')
const config = require(path.resolve(cwd, 'qaep.config'))
console.log(config)
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    entry: utils.getEntryList('--all'),
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        // host: HOST || config.dev.host,
        host: utils.localIp(),
        // host: 'xstpdev.baidu.com',
        disableHostCheck: true,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
    ].concat(
        utils.getPageList().map(name => {
            return new HtmlWebpackPlugin({
                // 生成出来的html文件名
                filename: `${name}.html`,
                // 每个html的模版，这里多个页面使用同一个模版
                // template: `html-withimg-loader?min=false!${cwd}/src/view/${name}/index.html`,
                template: `html-withimg-loader?min=false!${cwd}/index.html`,
                inject: true,
                // 每个html引用的js模块，也可以在这里加上vendor等公用模块
                chunks: [name]
            })
        })
    )
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {

            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)

            opn(`http://${devWebpackConfig.devServer.host}:${port}`)
        }
    })
})
