<template>
    <section v-if="list.length != 0">
        <ul class="scene-list">
            <li :class="{'qrcode' : item.qrcode}"
                :style="{'animation-delay': 50 * index + 'ms'}"
                :key="item.id"
                v-for="(item, index) in list">
                <div class="publish-status">
                    <span :class="sceneStatus[item.status].ename">{{sceneStatus[item.status].name}}</span>
                </div>
                <div class="image">
                    <div class="front"
                        :style="{'background-image': `url(${item.portrait})`}"></div>
                    <div class="overlay">
                        <router-link class="edit"
                            :to="{ name: 'detail', params: { id: item.id }}">
                            <div>
                                <i class="icon iconfont icon-yulan"></i>
                            </div>
                            <span>详情</span>
                        </router-link>
                        <router-link class="edit"
                            :to="{ name: 'edit', params: { id: item.id }}">
                            <div>
                                <i class="icon iconfont icon-bianji"></i>
                            </div>
                            <span>编辑</span>
                        </router-link>
                    </div>
                </div>
                <div class="project-info">
                    <p class="project-title">{{item.title}}</p>
                    <a class="show-count">
                        <i class="icon iconfont icon-yulan"></i>
                        <span>0</span>
                    </a>
                    <div class="button-list">
                        <a @mouseenter="$set(item, 'qrcode', true);"
                            @mouseleave="$set(item, 'qrcode', false);"
                            class="erweima">
                            <i class="icon iconfont icon-erweima"></i>
                        </a>
                        <div>
                            <a class="button button-delete"
                                @click="del(item)">
                                <i class="icon iconfont icon-shanchu"></i>
                                <span>删除</span>
                            </a>
                            <a class="button button-publish"
                                @click="publish(item)"
                                v-if="item.status != 1">
                                <i class="icon iconfont icon-fabu"></i>
                                <span>发布</span>
                            </a>
                            <a class="button button-copy"
                                @click="copy(item)">
                                <i class="icon iconfont icon-fuzhi"></i>
                                <span>复制</span>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <el-pagination style="text-align:center;"
            :current-page.sync="currentPage"
            @current-change="get({page:$event})"
            :page-size="limit"
            background
            layout="prev, pager, next"
            :total="total"></el-pagination>
    </section>
    <section v-else
        class="no-list">
        <h2>暂无场景</h2>
        <a @click="createScene">创建场景</a>
        <img src="@/img/notfound.svg" />
    </section>
</template>

<script>
import Bus from "./bus.js";
import * as api from "@/api/index";

export default {
    mounted() {
        Bus.$on("updateData", (payload = {}) => {
            if (payload.page) {
                this.currentPage = payload.page;
            }
            this.get(payload);
        });
        this.get();
    },
    methods: {
        createScene() {
            Bus.$emit("createScene");
        },
        get({ page = 1, status } = {}) {
            api
                .getSceneList({
                    limit: this.limit,
                    page: page,
                    status: status
                })
                .then(res => {
                    this.list = res.result.data;
                    this.total = res.result.info.total;
                })
                .catch(() => {});
        },
        del(item) {
            this.$confirm("确定删除此场景?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    await api.delScene({ id: item.id });
                    this.$notify({
                        title: "删除成功",
                        message: "可以到回收站里找回场景",
                        type: "success"
                    });
                    this.get();
                })
                .catch(() => {});
        },
        copy(item) {
            Bus.$emit("createScene", {
                title: item.title,
                desc: item.desc,
                copyId: item.id
            });
        },
        publish(item) {
            this.$confirm("确定发布此场景?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info"
            })
                .then(async () => {
                    await api.publishScene({
                        id: item.id
                    });
                    this.$notify({
                        title: "发布成功",
                        type: "success"
                    });
                    this.get({ page: 1 });
                })
                .catch(() => {});
        }
    },
    data() {
        return {
            list: [],
            currentPage: 1,
            total: 0,
            limit: 12,
            sceneStatus: {
                0: {
                    name: "未发布",
                    ename: "unpublish"
                },
                1: {
                    name: "已发布",
                    ename: "publish"
                },
                2: {
                    name: "有修改",
                    ename: "changed"
                },
                3: {
                    name: "已删除",
                    ename: "delete"
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";

.scene-list {
    display: flex;
    flex-wrap: wrap;
    li {
        animation: fade-scale-02 0.25s backwards;
        position: relative;
        font-size: 12px;
        background-color: #fff;
        border-radius: 3px;
        @include wh(280px, 360px);
        overflow: hidden;
        margin: 0 20px 20px 0;
        &:nth-child(4n) {
            margin-right: 0;
        }
        .publish-status {
            position: absolute;
            @include wh(140px, 80px);
            text-align: center;
            z-index: 4;
            span {
                position: absolute;
                left: -40px;
                top: 16px;
                @include wh(100%, 30px);
                line-height: 30px;
                color: #fff;
                transform: rotate(-45deg);
            }
            .unpublish {
                background-color: #a3afb7;
            }
            .publish {
                background-color: green;
            }
            .changed {
                background-color: #f1a55e;
            }
            .delete {
                background-color: red;
            }
        }
        .image {
            @include wh(280px, 260px);
            overflow: hidden;
            transition: 0.2s;
            .front {
                height: 280px;
                background-repeat: no-repeat;
                background-size: 100%;
            }
            .overlay {
                @include wh(100%, 280px);
                display: none;
                position: absolute;
                background-color: rgba(0, 0, 0, 0.8);
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
                    div {
                        @include wh(50px, 50px);
                        font-size: 20px;
                        border-radius: 50%;
                        background-color: hsla(0, 0%, 100%, 0.2);
                        text-align: center;
                        line-height: 50px;
                        margin-bottom: 10px;
                        transition: 0.2s;
                        &:hover {
                            background-color: #5cc9f5;
                        }
                    }
                }
            }
        }
        .project-info {
            position: relative;
            @include wh(100%, 100px);
            background-color: #fff;
            text-align: center;
            z-index: 1;
            padding: 20px;
            transition: transform 0.2s ease;
            .project-title {
                font-size: 14px;
                line-height: 30px;
            }
            .show-count span {
                margin-left: 5px;
            }
            .button-list {
                display: flex;
                position: absolute;
                width: 100%;
                left: 0;
                padding: 0 10px;
                bottom: -35px;
                justify-content: space-between;
                .erweima {
                    background: #f0f3f4;
                    border: 5px solid #f0f3f4;
                    border-radius: 3px;
                    @include wh(30px, 30px);
                    cursor: pointer;
                    &:hover {
                        background: #5ec8f7;
                        border: 5px solid #5ec8f7;
                        color: #fff;
                    }
                }
                .button {
                    @include wh(30px, 30px);
                    font-size: 12px;
                    display: inline-block;
                    overflow: hidden;
                    cursor: pointer;
                    transition: 0.3s;
                    margin-left: 3px;
                    border: 1px solid #ccd5db;
                    border-radius: 3px;
                    text-align: left;
                    background: #fff;
                    i {
                        padding: 0 10px 0 8px;
                        line-height: 28px;
                    }
                    span {
                        margin-right: 10px;
                        color: #fff;
                    }
                    &:hover {
                        width: 70px;
                        i {
                            color: #fff;
                        }
                    }
                    &.button-delete:hover {
                        background-color: #fd7f80;
                        border-color: #fd7f80;
                    }
                    &.button-publish:hover {
                        background-color: #4fd4b2;
                        border-color: #4fd4b2;
                    }
                    &.button-copy:hover {
                        background-color: #5ec8f7;
                        border-color: #5ec8f7;
                    }
                }
            }
        }
        &:hover {
            .overlay {
                display: block;
            }
            .image {
                height: 220px;
            }
        }
        &.qrcode {
            .front {
                background: url(~@/img/show.svg) center 0px no-repeat !important;
                background-size: 240px !important;
                animation: zoomIn 0.5s ease-in-out 0s 1 both;
            }
            .overlay {
                display: none;
            }
            .publish-status {
                display: none;
            }
        }
    }
}

.no-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    h2 {
        margin-bottom: 20px;
        color: #526069;
    }
    a {
        @include sc(14px, #59c7f9);
        display: block;
        margin-bottom: 20px;
    }
}
</style>
