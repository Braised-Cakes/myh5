<style lang="scss" scoped>
    .wrapper {
        width: 970px;
        background: #fff;
        border-radius: 6px;
        z-index: 9999999;
        position: absolute;
        left: 100px;
        top: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        .header {
            padding: 15px 20px;
            border-bottom: 1px solid #ccd5db;
            min-height: 21px;
            background-color: #f7f7f7;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h4 {
                font-size: 18px;
                font-weight: bold;
                span {
                    color: #a3afb7;
                    font-size: 12px;
                    padding-left: 10px;
                }
            }
            .close {
                display: block;
                width: 14px;
                height: 14px;
                color: #a3afb7;
                line-height: 14px;
                font-size: 21px;
                font-weight: bold;
                text-align: center;
            }
        }
        .main {
            display: flex;
            height: calc(100% - 56px);
            .left {
                width: 160px;
                background: #f7f7f7;
                ul {
                    li {
                        height: 50px;
                        line-height: 50px;
                        color: #76838f;
                        font-size: 14px;
                        text-indent: 20px;
                        cursor: pointer;
                        &:hover {
                            color: #1593ff;
                        }
                        &.active {
                            background: #fff;
                            border-top: 1px solid #ccd5db;
                            border-bottom: 1px solid #ccd5db;
                        }
                        &:first-child {
                            border-top: none;
                        }
                    }
                }
            }
            .right {
                padding: 20px;
                height: 480px;
                flex: 1;
                position: relative;
                ul {
                    height: 380px;
                    margin-bottom: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 115px;
                        height: 115px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        background-color: #e6ebed;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: contain;
                        &:nth-child(6n) {
                            margin-right: 0;
                        }
                    }
                }
                .footer {
                    position: absolute;
                    bottom: 20px; // left: 0;
                }
            }
        }
    }

</style>

<template>
    <div class="wrapper" v-if="btn">
        <div class="header">
            <h4>形状库
                <span>矢量素材，可更换颜色，放大不失真</span>
            </h4>
            <span class="close">x</span>
        </div>
        <div class="main">
            <div class="left">
                <ul>
                    <li @click="index=0" :class="{'active':index==0}">形状库</li>
                    <li @click="index=1" :class="{'active':index==1}">最近使用</li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li @click="cc(item.id)" :style="{'background-image':`url(/store/${item.path})`}" v-for="item in list"></li>
                </ul>
                <div class="footer">
                    <el-pagination background @current-change="get" :page-size="pageSize" layout="prev, pager, next" :total="total"></el-pagination>
                    <!-- <el-pagination @current-change="get" :page-size="12" background layout="prev, pager, next" :total="total"></el-pagination> -->
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import * as api from '@/api'
    import * as types from '@/tpl/types'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                btn: true,
                index: 0,
                list: [],
                page: 1,
                pageSize: 18,
                total: 0
            }
        },
        methods: {
            ...mapActions(['addItem']),
            cc(id) {
                api.getShapeContent({
                    id: id
                }).then(({
                    result
                }) => {
                    this.btn = false;
                    this.addItem({
                        type: types.SHAPE,
                        content: result.match(/<svg[\s\S]+/)[0]
                    });
                })
            },
            get(page) {
                api.getShape({
                    limit: 18,
                    page: page || 1
                }).then(res => {
                    console.log(res);
                    this.list = res.result.data;
                    this.total = res.result.info.total;
                })
            }
        },
        mounted() {
            this.get();
        }
    }

</script>
