<template>
    <div>
        <v-header></v-header>
        <div class="main">
            <div class="create_right">
                <div class="top" style="height:50px;">
                    <ul>
                        <li>
                            <i>+</i>
                            <span @click="phoneData.push(123)">常规页</span>
                        </li>
                    </ul>
                </div>

                <el-scrollbar class="page-component__nav">
                    <ul class="page_ul">
                        <li :class="{'active': index == currentPage}" @click="selectPage(index)" v-for="(item, index) in phoneData.data">
                            <span>
                                <em class="ng-binding">{{index + 1}}</em>
                            </span>
                            <span @click.stop="delPage(index)">
                                <i class="icon iconfont icon-more"></i>
                            </span>
                        </li>
                    </ul>
                </el-scrollbar>
                <div class="bottom">
                    <ul>
                        <li>
                            <i>+</i>
                            <span @click="addPage">常规页{{currentPage}}</span>
                        </li>
                    </ul>
                </div>
            </div>
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
    export default {
        components: {
            'v-header': vHeader
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
        height: 100%;
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
                    &:first-child {
                        border-top: 1px solid #e6ebed;
                    }
                    &:hover {
                        background: #fafafa;
                    }
                    &.active {
                        background: #fafafa;
                        em {
                            background: #2495fc;
                        }
                        .icon {
                            color: #666;
                        }
                    }
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
                    .icon {
                        font-size: 20px;
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
