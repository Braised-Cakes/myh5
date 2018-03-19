<template>
    <div style="height:100%;">
        <v-header></v-header>
        <el-scrollbar class="page-component__nav" style="height:100%;">
            <div class="main">
                <v-page></v-page>
                <div class="workspace">
                    <div class="container">
                        <div class="phone-bg"></div>
                        <div class="phone-area">
                            <div :style="item.style" v-for="item in currentPhone.data" v-html="item.content.replace(/\n/g, '<br>')"></div>
                        </div>
                    </div>
                </div>
                <div class="help">
                    <ul>
                        <li>
                            <el-tooltip class="item" content="Right Center 提示文字" placement="right">
                                <div>
                                    <i class="icon iconfont icon-more"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li>
                            <el-tooltip class="item" content="Right Center 提示文字" placement="right">
                                <div>
                                    <i class="icon iconfont icon-more"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li>
                            <el-tooltip class="item" content="Right Center 提示文字" placement="right">
                                <div>
                                    <i class="icon iconfont icon-more"></i>
                                </div>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
            </div>
        </el-scrollbar>
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
            ...mapGetters(['phoneData', 'currentPage', 'currentPhone'])
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
    .help {
        width: 40px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, .16);
        background: #fff;
        position: absolute;
        z-index: 99999;
        left: 770px;
        top: 200px;
        ul {
            li {
                color: #999;
                height: 40px;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                .item {
                    width: 40px;
                    height: 40px;
                }
                &:hover {
                    background: #2495fc;
                }
            }
        }
    }

    .workspace {
        position: absolute;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 200px;
        right: 260px;
        z-index: 1000;
        .container {
            width: 328px;
            height: 560px;
            position: absolute;
            top: 5%;
            left: 20%;
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
        min-width: 1180px;

    }

</style>
