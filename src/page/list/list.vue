<template>
    <div>
        <v-header></v-header>
        <div class="contain">
            <button @click="add">新增一页</button>
            <ul>
                <li v-for="item in list">
                    <div class="image">
                        <div class="front"></div>
                        <div class="overlay">
                            <a class="edit">
                                <div>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-bianji"></use>
                                    </svg>
                                </div>
                                <span>详情</span>
                            </a>
                            <a class="edit" @click="del(item)">
                                <div>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-bianji"></use>
                                    </svg>
                                </div>
                                <span>详情</span>
                            </a>
                        </div>
                    </div>
                    <div class="project-info">
                        <p>场景</p>
                    </div>
                </li>
            </ul>
        </div>
        <el-pagination @current-change="get" :page-size="12" background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import Header from '@/components/header/header.vue'
    import Sidebar from '@/components/sidebar/sidebar.vue'
    import * as api from '@/api/index'
    import $ from 'jquery'
    export default {
        components: {
            'vHeader': Header,
            'vSidebar': Sidebar
        },
        computed: {
            ...mapState([
                'aabbb'
            ]),
        },
        methods: {
            get(page) {
                api.getJobList({
                    limit: 12,
                    page: page || 1
                }).then(res => {
                    console.log(res);
                    this.list = res.result.data;
                    this.total = res.result.info.total;
                })
            },
            add() {
                api.addList({}).then(res => {
                    console.log(res);
                })
            },
            del(item) {
                api.delList({
                    work_id: item.work_id
                }).then(res => {
                    console.log(res);
                })
            }
        },
        mounted() {
            this.get();
        },
        data() {
            return {
                list: [],
                currentPage: 1,
                total : 0
            }
        }
    }

</script>
<style lang="scss" scoped>
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            position: relative;
            font-size: 12px;
            background-color: #fff;
            border-radius: 3px;
            width: 280px;
            height: 360px;
            overflow: hidden;
            margin-right: 20px;
            margin-bottom: 20px;
            .image {
                width: 280px;
                height: 260px;
                overflow: hidden;
                transition: .2s;
                .front {
                    height: 280px;
                    background: url(~@/img/logo.png) no-repeat;
                    background-size: 100%;
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                }
                .overlay {
                    display: none;
                    height: 280px;
                    border-top-left-radius: 3px;
                    border-top-right-radius: 3px;
                    width: 100%;
                    position: absolute;
                    background-color: rgba(0, 0, 0, .8);
                    text-align: center;
                    z-index: 1;
                    top: 0;
                    color: #fff;
                    transform: translateY(-20px);
                    .edit {
                        display: inline-block;
                        margin-top: 93px;
                        padding: 0 10px;
                        cursor: pointer;
                        color: #fff;
                        opacity: 1;
                        position: relative;
                        div {
                            font-size: 20px;
                            display: block;
                            border-radius: 50%;
                            background-color: hsla(0, 0%, 100%, .2);
                            text-align: center;
                            width: 50px;
                            height: 50px;
                            line-height: 50px;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
            .project-info {
                background-color: #fff;
                position: absolute;
                height: 100px;
                width: 100%;
                text-align: center;
                z-index: 1;
                padding: 20px;
                transition: transform .2s ease;
            }
            &:hover {
                .overlay {
                    display: block;
                }
                .image {
                    height: 220px;
                }

            }
        }
    }

</style>
