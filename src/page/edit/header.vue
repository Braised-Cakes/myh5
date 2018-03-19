<template>
    <header>
        <div class="creat-logo">
            <router-link to="list">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-logo"></use>
                </svg>
            </router-link>
        </div>
        <div class="creat_con">
            <ul>
                <li @click="addItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-logo"></use>
                    </svg>
                    <span>文本</span>
                </li>
                <li>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-logo"></use>
                    </svg>
                    <span>背景</span>
                </li>
            </ul>
        </div>
        <div class="create-action">
            <ul>
                <li>
                    <span>预览和设置</span>
                </li>
                <li>
                    <span>保存</span>
                </li>
                <li>
                    <span>发布</span>
                </li>
                <li class="quit">
                    <span>退出</span>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import Header from '@/components/header/header.vue'
    import * as api from '@/api/index'
    import $ from 'jquery'
    export default {
        components: {},
        computed: {
            ...mapGetters(['phoneData'])
        },
        methods: {
            ...mapActions(['addItem'])
        },
        mounted() {},
        data() {
            return {

            }
        }
    }

</script>
<style lang="scss" scoped>
    $headerHeight:56px;
    header {
        display: flex;
        justify-content: space-between;
        height: $headerHeight;
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        z-index: 1000;
        box-shadow: 0 0 16px rgba(0, 0, 0, .16);
        align-items: center;
        .creat-logo {
            width: 72px;
            border-right: 1px solid #e6ebed;
            a {
                font-size: 45px;
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                color: #1593ff;
            }
        }
        .creat_con {
            ul {
                display: flex;
                align-items: center;
                li {
                    height: $headerHeight;
                    justify-content: center;
                    width: 60px;
                    cursor: pointer;
                    text-align: center;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #333;
                    font-size: 13px;
                    svg {
                        font-size: 20px;
                    }
                    &:hover {
                        background: #2495fc;
                        color: #fff;
                    }
                }

            }
        }
        .create-action {
            ul {
                display: flex;
                li {
                    padding: 0 8px;
                    margin-right: 8px;
                    cursor: pointer;
                    text-align: center;
                    border-radius: 3px;
                    color: #fff;
                    background-color: #1593ff;
                    transition: .3s;
                    span {
                        font-size: 12px;
                        line-height: 32px;
                    }
                    &:hover {
                        background: #258ce4;
                    }
                    &.quit {
                        background: #666;
                        &:hover {
                            background: #fc2f6c;
                        }
                    }

                }
            }
        }
    }

</style>
