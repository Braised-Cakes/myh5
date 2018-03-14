<template>
    <div>
        <v-header></v-header>
        <div class="main">
            <div class="create_right">
                <div class="top" style="height:50px;">
                    <ul>
                        <li>
                            <i>+</i>
                            <span>常规页</span>
                        </li>
                    </ul>
                </div>

                <el-scrollbar class="page-component__nav">
                    <ul class="page_ul">
                        <li v-for="(item, index) in list">
                            <span>
                                <em class="ng-binding">{{index + 1}}</em>
                            </span>
                            <span>
                                <i class="icon iconfont icon-more"></i>
                            </span>
                        </li>
                    </ul>
                </el-scrollbar>
                <div class="bottom">
                    <ul>
                        <li>
                            <i>+</i>
                            <span>常规页</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import Header from '@/components/header/header.vue'
    import * as api from '@/api/index'
    import $ from 'jquery'
    import vHeader from './header'
    export default {
        components: {
            'v-header': vHeader
        },
        computed: {},
        methods: {},
        mounted() {},
        data() {
            return {
                list: [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1]
            }
        }
    }

</script>
<style lang="scss" scoped>
    .icon {
        font-size: 20px;
    }

    .main {
        background-color: #d0cfd8;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin-top: 56px;
        .create_right {
            position: fixed;
            right: 0;
            top: 56px;
            bottom: 0;
            width: 260px;
            z-index: 999;
            background-color: #fff;
            box-shadow: 0 0 0px rgba(0, 0, 0, .16);
            .page-component__nav {
                height: calc(100vh - 56px - 50px - 46px - 10px);
            }
            .page_ul {
                li {
                    height: 70px;
                    color: #76838f;
                    cursor: pointer;
                    font-size: 12px;
                    position: relative;
                    border-bottom: 1px solid #e6ebed;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    span {
                        em {
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            line-height: 24px;
                            text-align: center;
                            border-radius: 12px;
                            background-color: #ccc;
                            color: #fff;
                        }
                    }
                }
            }
            .bottom {
                position: absolute;
                width: 100%;
                bottom: 10px;
                height: 36px;
                ul {
                    display: flex;
                    justify-content: center;
                    li {
                        height: 36px;
                        width: 106px;
                        text-align: center;
                        border-radius: 3px;
                        top: 0;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all .3s;
                        background-color: #1593ff;
                        color: #fff;
                    }
                }
            }
        }
    }

</style>
