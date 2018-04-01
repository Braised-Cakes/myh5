<template>
    <div class="create_right">
        <div class="top">
            <ul>
                <li v-if="!hasSelectedItems" @click="nav=1" :class="{active:nav==1}">页面属性</li>
                <li v-if="hasSelectedItems" @click="nav=1" :class="{active:nav==1}">元素属性</li>
                <li @click="nav=0" :class="{active:nav==0}">页面管理</li>
            </ul>
        </div>
        <div v-if="nav==0">
            <el-scrollbar class="page-component__nav">
                <ul class="page_ul">
                    <draggable v-model="myList" :move="move" @start="start" @end="end">
                        <transition-group>
                            <li @mousedown.stop="selectPage(index)" :class="{'active': index == currentPage, 'drag' : drag && index == oldIndex}" v-for="(item, index) in myList"
                                :key="index">
                                <div v-if="!(drag && index == oldIndex)">
                                    <span>
                                        <em>{{index + 1}}</em>
                                    </span>
                                    <span @click.stop="delPage(index)">
                                        <i class="icon iconfont icon-fuzhi"></i>
                                    </span>
                                </div>
                            </li>
                        </transition-group>
                    </draggable>
                </ul>
            </el-scrollbar>
            <div class="bottom" draggable="false">
                <ul>
                    <li @click="addPage">
                        <i>+</i>
                        <span>常规页</span>
                    </li>
                </ul>
            </div>
        </div>
        <edit-dom v-if="nav==1 && hasSelectedItems"></edit-dom>
        <page-dom v-if="nav==1 && !hasSelectedItems"></page-dom>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import Header from '@/components/header/header.vue'
    import EditDom from './edit-dom'
    import PageDom from './page-dom'
    import * as api from '@/api/index'
    import $ from 'jquery'
    import vHeader from './header'
    import draggable from 'vuedraggable'

    export default {
        components: {
            'v-header': vHeader,
            'edit-dom': EditDom,
            'page-dom': PageDom,
            draggable,
        },
        computed: {
            ...mapGetters(['phoneData', 'currentPage', 'hasSelectedItems']),
            myList: {
                get() {

                    return this.$store.getters.phoneData.data;
                },
                set(value) {
                    this.sortPage({
                        futureIndex: this.futureIndex,
                        value: value
                    });
                }
            }
        },
        methods: {
            ...mapActions(['addPage', 'selectPage', 'delPage', 'sortPage']),
            move(originalEvent) {
                this.oldIndex = originalEvent.draggedContext.index;
                this.futureIndex = originalEvent.draggedContext.futureIndex;
            },
            start(originalEvent) {
                this.drag = true;
                this.oldIndex = this.futureIndex = originalEvent.oldIndex;
            },
            end(originalEvent) {
                this.drag = false;
            }
        },
        mounted() {},
        data() {
            return {
                oldIndex: -1,
                futureIndex: -1,
                drag: false,
                nav: 1
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import '~@/css/variables.scss';
    $panelNavHeight:50px;
    $bottomHeight:36px;
    $bottomBottom:10px;
    .top {
        ul {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            li {
                text-align: center;
                flex: 1;
                background: #e0e0e0;
                font-size: 14px;
                color: #000;
                height: $panelNavHeight;
                line-height: $panelNavHeight;
                transition: .3s;
                cursor: pointer;
                &.active {
                    background: #fff;
                    font-weight: 700;
                }
                &:hover {
                    font-weight: 700;
                }
            }
        }
    }

    .create_right {
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        width: 260px;
        z-index: 999;
        background-color: #fff;
        box-shadow: 0 0 0px rgba(0, 0, 0, .16);
        .page-component__nav {
            height: calc(100vh - #{$headerHeight + $panelNavHeight + $bottomHeight + $bottomBottom});
        }
        .page_ul {
            li {
                height: 70px;
                color: #76838f;
                cursor: pointer;
                font-size: 12px;
                position: relative;
                border-bottom: 1px solid #e6ebed;
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
                &.drag {
                    background: #fff996;
                }
                div {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    height: 100%;
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
                        .icon {
                            font-size: 20px;
                        }
                    }
                }
            }
        }
        .bottom {
            position: absolute;
            width: 100%;
            bottom: $bottomBottom;
            height: $bottomHeight;
            ul {
                display: flex;
                justify-content: center;
                li {
                    height: $bottomHeight;
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

</style>
