<template>
    <div>
        <v-header></v-header>
        <section>
            <img src="http://toos.baidu.com/static/img/toos_header.21106c5.jpg" />
        </section>
        <section>
            <h3>合作与生态</h3>
            <ul>
                <li v-for="item in list">
                    <img :src="item.src" />
                    <p>{{item.txt}}</p>
                </li>
            </ul>
        </section>
        <section>
            <h3>资源接入合作流程</h3>
            <ul>
                <li v-for="item in list">
                    <img :src="item.src" />
                    <p>{{item.txt}}</p>
                </li>
            </ul>
        </section>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import Header from '@/components/header/header.vue'
    import Footer from '@/components/footer/Footer.vue'
    export default {
        components: {
            'vHeader': Header,
            'vFooter': Footer
        },
        data() {
            return {
                list: [{
                    src: 'http://toos.baidu.com/static/index/jierunenglifenlei.png',
                    txt: '接入能力分类'
                }, {
                    src: 'http://toos.baidu.com/static/index/jierufangshiqueren.png',
                    txt: '接入方式确认'
                }, {
                    src: 'http://toos.baidu.com/static/index/kaifaliantiao.png',
                    txt: '开发联调'
                }, {
                    src: 'http://toos.baidu.com/static/index/shangxianyunxing.png',
                    txt: '上线运行'
                }]
            }
        }
    }

</script>
<style lang="scss" scoped>
    h3 {
        text-align: center;
        font-size: 26px;
        line-height: 60px;
    }

    ul {
        display: flex;
        justify-content: center;
        li {
            width: 200px;
            height: 200px;
            background: #f9f9f9;
            margin: 0 10px;
            text-align: center;
            padding-top: 40px;
        }
    }

</style>
