<template>
    <div style="height:100%;">
        <v-header></v-header>
        <el-scrollbar class="page-component__nav" style="height:100%;">
            <div class="main">
                <v-page :data="panel"></v-page>
                <v-panel></v-panel>
                <div class="workspace" @mousedown.stop="cancelSelect">
                    <div class="container">
                        <div class="phone-bg"></div>
                        <div class="phone-area" v-if="currentPhone" :style="{ 'background' : currentPhone.main.background }">
                            <div :id="item.id" :key="item.id" v-my-drag @mousedown.stop="select(index)" class="phone-item" :style="item.style | filterItemWrap"
                                v-for="(item, index) in currentPhone.data">
                                <!-- <div class="item-body" :style="item.style | filterItem" v-html="item.content.replace(/\n/g, '<br>')"></div> -->
                                <div class="item-body" :style="item.style | filterItem" v-html="item.content"></div>
                                <div v-if="curItemId == index" style="position:absolute;border:1px solid #1ea3ec;width:100%;height:100%;top:0;left:0;">
                                    <div class="circle circle-nw"></div>
                                    <div class="circle circle-ne"></div>
                                    <div class="circle circle-sw"></div>
                                    <div class="circle circle-se"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="help">
                    <ul>
                        <li @click="copyPage">
                            <el-tooltip class="item" content="复制当前页" placement="right">
                                <div>
                                    <i class="icon iconfont icon-fuzhi"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li @click="runCurPhoneAni(true)">
                            <el-tooltip class="item" content="播放" placement="right">
                                <div>
                                    <i class="icon iconfont icon-bofang"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li @click="setZIndex('++')">
                            <el-tooltip class="item" content="置顶" placement="right">
                                <div>
                                    <i class="icon iconfont icon-zhiding"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li @click="setZIndex('+')">
                            <el-tooltip class="item" content="上移" placement="right">
                                <div>
                                    <i class="icon iconfont icon-shangyi"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li @click="setZIndex('-')">
                            <el-tooltip class="item" content="下移" placement="right">
                                <div>
                                    <i class="icon iconfont icon-xiayi"></i>
                                </div>
                            </el-tooltip>
                        </li>
                        <li @click="setZIndex('--')">
                            <el-tooltip class="item" content="置底" placement="right">
                                <div>
                                    <i class="icon iconfont icon-12_zhidi"></i>
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
    import vPanel from './panel'
    import * as api from '@/api/index'
    import $ from 'jquery'
    import vHeader from './header'
    import vPage from './page'
    import * as utils from '@/utils'
    export default {
        components: {
            'v-header': vHeader,
            'v-page': vPage,
            'v-panel': vPanel
        },
        filters: {
            filterItemWrap(res) {
                var json = {};
                for (let attr in res) {
                    if (attr == 'position' || attr == 'left' || attr == 'width' || attr == 'height' || attr == 'top' ||
                        attr == 'z-index') {
                        json[attr] = res[attr];
                    }
                }
                return json
            },
            filterItem(res) {
                var json = {};
                for (let attr in res) {
                    if (attr == 'position' || attr == 'left' || attr == 'top') {} else {
                        json[attr] = res[attr];
                    }
                }
                return json;
            }
        },
        computed: {
            ...mapGetters(['phoneData', 'currentPage', 'currentPhone', 'curItem', 'hasSelectedItems', 'curItemId'])
        },
        methods: {
            ...mapActions(['selectItem', 'updateItem', 'reset', 'addPage', 'selectPage', 'delPage', 'setPhone',
                'copyPage',
                'cancelSelect'
            ]),
            select(index) {
                this.selectItem(index);
                if (this.curItem.type == 'shape') {
                    var arr = [];
                    $(this.curItem.content).find('*').each((index, item) => {
                        if ($(item).attr('fill') && arr.every((item2) => {
                                return item2.fill != $(item).attr('fill')
                            })) {
                            arr.push({
                                fill: $(item).attr('fill'),
                                css: $(item).css('fill')
                            })
                        }
                    });
                    this.panel.fillColorList = arr;
                }
            },
            runCurPhoneAni: utils.runCurPhoneAni,
            setZIndex(type) {
                if (!this.curItem) return;
                let minZIndex = 1;
                let maxZIndex = this.currentPhone.data.length;

                /**
                 * 找到选中元素的z-index,   
                 * 
                 * 当删除元素的时候， 一次可以删一个， 也可以删多个  调整z-index
                 * 
                 * 如果是上移一层，就找z-index = now + 1的元素
                 * 
                 * 如果是置顶，就找z-index比他大的所有元素
                 * 
                 * 遍历所有元素 ， 如果z-index > now,  z-index - 1,  最后now = 
                 */
                const index = this.currentPhone.data.findIndex((item) => {
                    return item === this.curItem;
                })
                const zIndex = this.curItem.style['z-index'];
                if (zIndex == minZIndex && (type == '-' || type == '--') || zIndex == maxZIndex && (type == '+' || type ==
                        '++')) {
                    return;
                }

                for (let i = 0; i < this.currentPhone.data.length; i++) {
                    if (type == '+' && this.currentPhone.data[i].style['z-index'] == zIndex + 1) {
                        this.updateItem({
                            item: this.currentPhone.data[i],
                            key: 'style',
                            val: {
                                'z-index': zIndex
                            }
                        })
                    } else if (type == '-' && this.currentPhone.data[i].style['z-index'] == zIndex - 1) {
                        this.updateItem({
                            item: this.currentPhone.data[i],
                            key: 'style',
                            val: {
                                'z-index': zIndex
                            }
                        })
                    } else if (type == '++' && this.currentPhone.data[i].style['z-index'] >= zIndex + 1) {
                        this.updateItem({
                            item: this.currentPhone.data[i],
                            key: 'style',
                            val: {
                                'z-index': this.currentPhone.data[i].style['z-index'] - 1
                            }
                        })
                    } else if (type == '--' && this.currentPhone.data[i].style['z-index'] <= zIndex + 1) {
                        this.updateItem({
                            item: this.currentPhone.data[i],
                            key: 'style',
                            val: {
                                'z-index': this.currentPhone.data[i].style['z-index'] + 1
                            }
                        })
                    }
                }

                switch (type) {
                    case '+':
                        this.updateItem({
                            item: this.curItem,
                            key: 'style',
                            val: {
                                'z-index': zIndex + 1
                            }
                        });
                        break;
                    case '-':
                        this.updateItem({
                            item: this.curItem,
                            key: 'style',
                            val: {
                                'z-index': zIndex - 1
                            }
                        });
                        break;
                    case '++':
                        this.updateItem({
                            item: this.curItem,
                            key: 'style',
                            val: {
                                'z-index': maxZIndex
                            }
                        });
                        break;
                    case '--':
                        this.updateItem({
                            item: this.curItem,
                            key: 'style',
                            val: {
                                'z-index': minZIndex
                            }
                        });
                        break;
                }
            }
        },
        created() {
            this.reset();
            this.selectPage(0);
        },
        mounted() {
            this.setPhone({
                id: this.$route.params.id
            });
        },
        data() {
            return {
                panel: {
                    fillColorList: []
                }
            }
        }
    }

</script>
<style lang="scss" scoped>
    @import '~@/css/variables.scss';
    .help {
        width: 40px;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, .16);
        background: #fff;
        position: absolute;
        z-index: $helpZIndex;
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
        left: 0;
        right: 260px;
        z-index: $workspaceZIndex;
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
                .phone-item {
                    $size: 12px;
                    $position: -6px;
                    .circle {
                        width: $size;
                        height: $size;
                        background-color: #fff;
                        border: 1px solid #59c7f9;
                        border-radius: 12px;
                        position: absolute;
                        &.circle-nw {
                            left: $position;
                            top: $position;
                        }
                        &.circle-ne {
                            right: $position;
                            top: $position;
                        }
                        &.circle-sw {
                            left: $position;
                            bottom: $position;
                        }
                        &.circle-se {
                            right: $position;
                            bottom: $position;
                        }
                    }
                }
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
