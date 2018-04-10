<style lang="scss" scoped>
    @import '~@/css/variables.scss';
    .wrapper {
        width: 970px;
        background: #fff;
        border-radius: 6px;
        z-index: $panelZIndex;
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
                cursor: pointer;
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
                        cursor: pointer;
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
    <div class="wrapper" v-if="panel[types.SHAPE]">
        <div class="header">
            <h4>形状库
                <span>矢量素材，可更换颜色，放大不失真</span>
            </h4>
            <span @click="closePanel(types.SHAPE)" class="close">x</span>
        </div>
        <div class="main">
            <div class="left">
                <ul>
                    <li class="active">形状库</li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li @click="choiceShape(item.id)" :style="{'background-image':`url(/store/${item.path})`}" v-for="item in list"></li>
                </ul>
                <div class="footer">
                    <el-pagination background @current-change="get" :page-size="pageInfo.pageSize" layout="prev, pager, next" :total="pageInfo.total"></el-pagination>
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
        mapState,
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                types: types,
                list: [],
                pageInfo: {
                    pageSize: 18,
                    total: 0
                }
            }
        },
        computed: {
            ...mapState({
                panel: state => state.edit.panel
            })
        },
        methods: {
            ...mapActions(['addItem', 'openPanel', 'closePanel']),
            choiceShape(id) {
                api.getShapeContent({
                    id: id
                }).then(({
                    result
                }) => {
                    this.closePanel(types.SHAPE)
                    this.addItem({
                        type: types.SHAPE,
                        content: result.match(/<svg[\s\S]+/)[0]
                    });
                })
            },
            get(page) {
                api.getShape({
                    limit: this.pageInfo.pageSize,
                    page: page || 1
                }).then(res => {
                    this.list = res.result.data;
                    this.pageInfo.total = res.result.info.total;
                })
            }
        },
        mounted() {
            this.get();
        }
    }

</script>
