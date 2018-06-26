<template>
    <div class="list-page">
        <v-header></v-header>
        <section v-if="createSceneVisible">
            <el-dialog width="500px" @close="createSceneVisible = false" :close-on-click-modal="false" :visible.sync="createSceneVisible" :title="isCopy ? '复制场景' : '创建场景'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="">
                    <el-form-item prop="title" label="标题">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="desc" label="描述">
                        <el-input type="textarea" resize="none" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="createSceneVisible = false">取消</el-button>
                    <el-button type="success" @click="create">确定</el-button>
                </div>
            </el-dialog>
        </section>
        <section class="entrance">
            <div class="same-content">
                <el-button size="small" type="primary" @click="createSceneVisible = true" icon="el-icon-plus">创建场景</el-button>
                <el-button size="small" type="primary" @click="goTrash" icon="el-icon-delete">{{trash ? '我的场景' : '回收站'}}</el-button>
            </div>
        </section>
        <section class="container">
            <ul class="scene-list">
                <li :style="{'animation-delay': 50 * index + 'ms'}" :key="item.id" v-for="(item, index) in list">
                    <div class="publish-status">
                        <span :class="publishStatus[item.publishStatus].ename">{{publishStatus[item.publishStatus].name}}</span>
                    </div>
                    <div class="image">
                        <div class="front" :style="{'background-image': `url(${item.portrait})`}"></div>
                        <div class="overlay">
                            <router-link class="edit" :to="{ name: 'detail', params: { id: item.id }}">
                                <div>
                                    <i class="icon iconfont icon-yulan"></i>
                                </div>
                                <span>详情</span>
                            </router-link>
                            <router-link class="edit" :to="{ name: 'edit', params: { id: item.id }}">
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
                            <a @mouseenter="qrCodeEnter(index)" @mouseleave="qrCodeLeave(index)" class="erweima">
                                <i class="icon iconfont icon-erweima"></i>
                            </a>
                            <div>
                                <a class="button button-delete" @click="del(item)">
                                    <i class="icon iconfont icon-shanchu"></i>
                                    <span>删除</span>
                                </a>
                                <a class="button button-publish" @click="publish(item)" v-if="item.publishStatus != 1">
                                    <i class="icon iconfont icon-fabu"></i>
                                    <span>发布</span>
                                </a>
                                <a class="button button-copy" @click="copy(item)">
                                    <i class="icon iconfont icon-fuzhi"></i>
                                    <span>复制</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <el-pagination style="text-align:center;" @current-change="get" :page-size="12" background layout="prev, pager, next" :total="total"></el-pagination>
        </section>
    </div>
</template>

<script>
import Header from "./header.vue";
import * as api from "@/api/index";
import $ from "jquery";
export default {
    components: {
        vHeader: Header
    },
    watch: {
        createSceneVisible: function(val) {
            if (!val) {
                this.ruleForm.title = "";
                this.ruleForm.desc = "";
                this.isCopy = false;
                this.copyId = null;
            }
        }
    },
    methods: {
        qrCodeEnter(index) {
            $(".front")
                .eq(index)
                .addClass("front2");
            $(".overlay")
                .eq(index)
                .hide();
            $(".publish-status")
                .eq(index)
                .hide();
        },
        qrCodeLeave(index) {
            $(".front")
                .eq(index)
                .removeClass("front2");
            $(".overlay")
                .eq(index)
                .show();
            $(".publish-status")
                .eq(index)
                .show();
        },
        get(page) {
            api
                .getSceneList({
                    limit: 12,
                    page: page || 1,
                    status: this.trash ? 1 : 0
                })
                .then(res => {
                    this.list = res.result.data;
                    this.total = res.result.info.total;
                })
                .catch(() => {});
        },
        create() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    await api.addScene({
                        title: this.ruleForm.title,
                        desc: this.ruleForm.desc,
                        type: this.isCopy ? "copy" : "",
                        id: this.copyId
                    });
                    this.$notify({
                        title: this.isCopy ? "复制成功" : "创建成功",
                        type: "success"
                    });
                    this.createSceneVisible = false;
                    this.get();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
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
            this.ruleForm.title = item.title;
            this.ruleForm.desc = item.desc;
            this.isCopy = true;
            this.copyId = item.id;
            this.createSceneVisible = true;
        },
        goTrash() {
            this.trash = this.trash ? false : true;
            this.get();
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
                })
                .catch(() => {});
        }
    },
    mounted() {
        this.get();
    },
    data() {
        return {
            list: [],
            currentPage: 1,
            total: 0,
            createSceneVisible: false,
            isCopy: false,
            copyId: null,
            ruleForm: {
                title: "",
                desc: ""
            },
            trash: false,
            rules: {
                title: [
                    {
                        required: true,
                        message: "场景标题不能为空"
                    }
                ]
            },
            publishStatus: {
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
                }
            }
        };
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";
.entrance {
    background: #fff;
    border-bottom: 1px solid #e6ebed;
    margin-bottom: 20px;
    .same-content {
        @include wh(1180px, 60px);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.list-page {
    min-height: 100vh;
    background: #f1f4f5;
    color: #526069;
}
.container {
    width: 1180px;
    position: relative;
    margin: 0 auto;
    padding-bottom: 20px;
}
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
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(4n) {
            margin-right: 0;
        }
        .publish-status {
            position: absolute;
            top: -2px;
            left: -2px;
            @include wh(140px, 80px);
            text-align: center;
            z-index: 4;
            span {
                position: absolute;
                left: -40px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                top: 16px;
                padding: 0 20px;
                transform: rotate(-45deg);
            }
            .unpublish {
                color: #fff;
                background-color: #a3afb7;
            }
            .publish {
                color: #fff;
                background-color: green;
            }
            .changed {
                color: #fff;
                background-color: #f1a55e;
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
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
            }
            .front2 {
                background: url(~@/img/show.svg) center 0px no-repeat !important;
                background-size: 240px !important;
                animation: zoomIn 0.5s ease-in-out 0s 1 both;
            }
            .overlay {
                display: none;
                height: 280px;
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                width: 100%;
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
                    opacity: 1;
                    position: relative;
                    div {
                        font-size: 20px;
                        display: block;
                        border-radius: 50%;
                        background-color: hsla(0, 0%, 100%, 0.2);
                        text-align: center;
                        @include wh(50px, 50px);
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
            background-color: #fff;
            position: absolute;
            height: 100px;
            width: 100%;
            text-align: center;
            z-index: 1;
            padding: 20px;
            transition: transform 0.2s ease;
            .project-title {
                font-size: 14px;
                line-height: 30px;
            }
            .show-count {
                span {
                    margin-left: 5px;
                }
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
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    &:hover {
                        background: #5ec8f7;
                        border: 5px solid #5ec8f7;
                        color: #fff;
                    }
                }
                .button {
                    font-size: 12px;
                    @include wh(30px, 30px);
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
    }
}
</style>
