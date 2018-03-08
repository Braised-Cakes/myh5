'use strict'
const path = require('path')
const config = require(path.resolve(process.cwd(), 'qaep.config'))
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const devIp = require('dev-ip')
const cwd = process.cwd()

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

/**
 * 获取入口文件名列表
 * @return {Array} 入口名数组
 */
exports.getPageList = () => {
    if (config.base.onePage) {
        return ['index']
    } else {
        return glob.sync(path.resolve(process.cwd(), 'src/view/*')).map((item) => {
            return path.parse(item).name
        })
    }
}

/**
 * 获取入口文件名列表
 * @return {Array} 入口名数组
 * 如果包含，  --all 
 */
exports.getEntryList = (key) => {
    let list = {}
    if (config.base.onePage) {
        list = {
            'index': path.resolve(cwd, 'src/index.js')
        }
    } else {
        glob.sync(path.resolve(process.cwd(), 'src/view/*/index.js')).forEach((item) => {
            const name = path.parse(path.dirname(item)).name
            if (key == '--all' || key.indexOf(name) != -1) {
                list[name] = item
            }
        })
    }

    return list
}

/**
 * 获取指定路径下的入口文件
 * @param  {String} globPath 通配符路径
 * @return {Object}          入口名:路径 键值对
 */
exports.getEntries = (globPath) => {
    const files = glob.sync(exports.rootPath(globPath))
    const entries = {}
    files.forEach(function (filepath) {
        const dirname = path.dirname(path.relative('src/dep/', filepath))
        entries[dirname] = filepath
    })
    return entries
}



/**
 * 获取本机局域网 ip
 * @return {String} ip
 */
exports.localIp = function () {
    const ip = devIp()
    // vpn 下 ip 为数组，第一个元素为本机局域网 ip
    // 第二个元素为 vpn 远程局域网 ip
    return Array.isArray(ip) ? ip[0] : ip
}