<template>
    <div style="height:100%;">
        <v-header></v-header>
        <el-scrollbar class="page-component__nav" style="height:100%;">
            <div class="main">
                <v-page></v-page>
                <div class="workspace" @mousedown.stop="cancelSelect" >
                    <div class="container">
                        <div class="phone-bg"></div>
                        <div class="phone-area" :style="{ 'background' : currentPhone.main.background }">
                            <div v-my-drag @mousedown.stop="selectItem(index)" class="phone-item" :style="item.style | filterItemWrap" v-for="(item, index) in currentPhone.data">
                                <div :style="item.style | filterItem" v-html="item.content.replace(/\n/g, '<br>')"></div>
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
                        <li>
                            <el-tooltip class="item" content="复制当前页" placement="right">
                                <div @click="copyPage">
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
        filters: {
            filterItemWrap(res) {
                var json = {};
                for (let attr in res) {
                    if (attr == 'position' || attr == 'left' || attr == 'width' || attr == 'height' || attr == 'top') {
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
            ...mapActions(['selectItem', 'reset', 'addPage', 'selectPage', 'delPage', 'setPhone', 'copyPage', 'cancelSelect'])
        },
        created() {
            this.reset();
        },
        mounted() {
            this.setPhone({
                id: this.$route.params.id
            });
        },
        data() {
            return {}
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
        bottom: 0; // left: 200px;
        left: 0;
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
