<template>
    <div>
        <v-header></v-header>
        <div class="main">
            <v-page></v-page>
            <div class="workspace">
                <div class="container">
                    <div class="phone-bg"></div>
                    <div class="phone-area"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import Header from '@/components/header/header.vue'
    import * as api from '@/api/index'
    import $ from 'jquery'
    import vHeader from './header'
    import vPage from './page'
    export default {
        components: {
            'v-header': vHeader,
            'v-page': vPage
        },
        computed: {
            ...mapGetters(['phoneData', 'currentPage'])
        },
        methods: {
            ...mapActions(['addPage', 'selectPage', 'delPage'])
        },
        mounted() {},
        data() {
            return {
                list: [1, 2, 3]
            }
        }
    }

</script>
<style lang="scss" scoped>
    .workspace {
        position: absolute;
        height: 100%; // height: calc(100vh - 50px);
        // height: 700px;
        top: 0;
        bottom: 0;
        left: 333px;
        right: 260px;
        z-index: 1000;
        .container {
            width: 328px;
            height: 560px;
            position: absolute;
            left: 50%;
            margin-left: -164px;
            top: 50%;
            margin-top: -280px;
            .phone-bg {
                background: url(~@/img/phonewhite.svg);
                box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
                border-radius: 40px;
                width: 328px;
                height: 560px;
            }
            .phone-area {
                position: absolute;
                height: 486px;
                width: 320px;
                top: 37px;
                left: 4px;
                background: #fff;
            }
        }
    }

    .main {
        background-color: #eee;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin-top: 56px;

    }

</style>
