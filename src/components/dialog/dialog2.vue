<template>
    <el-dialog :before-close="handleClose" width="970px" class="panel-dialog" :visible="visible" :show-close="false">
        <div class="header" slot="title">
            <h4>{{title}}
                <span v-if="desc">{{desc}}</span>
            </h4>
            <span @click="$emit('close')" class="close">x</span>
        </div>
        <div class="main">
            <div class="left">
                <ul>
                    <li @click="changeLeftIndex(index)" :class="{active : leftIndex == index}" :key="item.name" v-for="(item, index) in leftNav">{{item.name}}</li>
                </ul>
                <div class="operation">
                    <div class="item">
                        <div class="progress-area"></div>
                        <el-upload :on-error="uploadError" ref="upload" :drag="true" accept="accept" :multiple="true" :limit="uploadInfo.limit" :on-exceed="uploadExceed" style="width:100%;" :on-success="uploadSuccess" :on-progress="uploadProgress" class="upload-demo" :data="uploadInfo.form" action="//up-z2.qiniup.com" :before-upload="beforeUpload" :show-file-list="false">
                            <el-tooltip effect="dark" :content="`支持格式：JPG,PNG,GIF, 一次最多上传${uploadInfo.limit}张`" placement="right">
                                <span class="uploadInfo.txt" style="width:100%;position:absolute;left:0;top:0;">{{uploadInfo.txt}}</span>
                            </el-tooltip>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="nav" v-if="leftIndex == 0 && navOption.length != 0">
                    <ul class="nav-list">
                        <li :key="item.typeId" @click="changeNav(index);" :class="{ active : navIndex == index}" v-for="(item, index) in navOption">{{ item.name }}</li>
                    </ul>
                    <ul class="tag-list">
                        <li @click="changeTag(index)" :class="{'active' : tagIndex == index}" :key="item.tagId" v-for="(item, index) in navOption[navIndex].children">{{item.name}}</li>
                    </ul>
                </div>
                <div class="right-content">
                    <slot name="content"></slot>
                    <!-- 列表为空 -->
                    <div class="no-list" v-if="list.length == 0">
                        <img style="width:300px;" src="@/img/default.svg" />
                    </div>
                    <div class="footer">
                        <el-pagination style="float:left;" v-show="pageInfo.total != 0" :current-page.sync="pageInfo.currentPage" background @current-change="get" :page-size="pageSize" layout="prev, pager, next" :total="pageInfo.total"></el-pagination>
                        <div style="float:right;">
                            <el-button @click="close" size="mini">取消</el-button>
                            <el-button @click="confirm" size="mini" type="success">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import $ from "jquery";
import * as api from "@/api";
export default {
    props: {
        title: {
            required: true
        },
        desc: String,
        type: String,
        leftNav: {
            required: true
        },
        pageSize: {
            required: true
        },
        navOption: {
            required: true
        },
        list: {
            required: true
        },
        func: {
            required: true
        },
        accept: String,
        judgeUpload: String,
        visible: Boolean
    },
    watch: {
        navOption: function(val) {
            if (val.length >= 0) {
                this.get();
            }
        }
    },
    data() {
        return {
            leftIndex: 0,
            navIndex: 0,
            pageInfo: {
                pageSize: 18,
                total: 0,
                currentPage: 1
            },
            uploadInfo: {
                limit: 5, //最大允许上传个数,
                txt: "上传",
                form: {
                    key: "",
                    token: ""
                },
                sucLen: 0
            },
            progressList: {},
            // uploadInfo.sucLen: 0,
            tagIndex: 0
        };
    },
    methods: {
        handleClose(done) {
            this.$emit("close");
            done();
        },
        changeLeftIndex(index) {
            this.leftIndex = index;
            this.pageInfo.currentPage = 1;
            this.get();
        },
        changeNav(index) {
            this.navIndex = index;
            this.pageInfo.currentPage = 1;
            this.get();
        },
        changeTag(index) {
            this.tagIndex = index;
            this.pageInfo.currentPage = 1;
            this.get();
        },
        close() {
            this.$emit("close");
        },
        /**
         * 确认
         */
        async confirm() {
            this.$emit("confirm");
            this.close();
        },
        get() {
            api[this.func]({
                limit: this.pageSize,
                page: this.pageInfo.currentPage,
                typeId: this.navOption[this.navIndex].typeId,
                used: this.leftIndex == 1 ? 1 : "",
                isMy: this.leftIndex == 2 ? 1 : "",
                tagId:
                    this.navOption[this.navIndex] &&
                    this.navOption[this.navIndex].children &&
                    this.navOption[this.navIndex].children[this.tagIndex].tagId
            }).then(res => {
                console.log(res);
                this.$emit("changeData", res.result.data);
                this.pageInfo.total = res.result.info.total;
            });
        },
        //上传
        transition(type) {
            switch (type) {
                case "done":
                    this.uploadInfo.txt = "上传";
                    $(".progress-area").css("width", 0);
                    this.$refs.upload.clearFiles();
                    break;
                case "process":
                    this.uploadInfo.txt = "上传中";
                    break;
            }
        },
        uploadSuccess(response, file) {
            api[this.judgeUpload](response).then(({ status }) => {
                //异常情况， 后缀为png,jpg等等，但是实际并不是图片
                if (status != 0) {
                    this.showNotify(file);
                }
                this.uploadInfo.sucLen++;
                this.leftIndex = 2;
                this.pageInfo.currentPage = 1;
                this.get();
                if (
                    this.uploadInfo.sucLen ==
                    Object.keys(this.progressList).length
                ) {
                    this.transition("done");
                }
            });
        },
        uploadError(err, file) {
            this.progressList[file.uid] = 100;
            this.uploadInfo.sucLen++;
            this.leftIndex = 2;
            this.pageInfo.currentPage = 1;
            if (
                this.uploadInfo.sucLen == Object.keys(this.progressList).length
            ) {
                this.transition("done");
            }
            this.showNotify(file);
            throw err;
        },
        showNotify(file) {
            this.$notify.error({
                title: "上传失败",
                message: `图片${file.name}上传失败`
            });
        },
        uploadExceed() {
            this.$alert(`一次最多上传${this.uploadInfo.limit}张图片`, {
                closeOnClickModal: true,
                callback: () => {}
            });
        },
        beforeUpload(file) {
            this.transition("process");
            return api
                .getToken({
                    fileName: file.name,
                    type: this.type
                })
                .then(({ token, key }) => {
                    this.uploadInfo.form.key = key;
                    this.uploadInfo.form.token = token;
                });
        },
        uploadProgress(event, file, fileList) {
            if (!file) {
                return;
            }
            this.progressList[file.uid] = parseInt(event.percent);
            let per = 0;
            for (let attr in this.progressList) {
                per += this.progressList[attr];
            }
            $(".progress-area").css(
                "width",
                parseInt(per / fileList.length) + "%"
            );
        }
    }
};
</script>
<style lang="scss">
.panel-dialog {
    .el-dialog__header,
    .el-dialog__body {
        padding: 0 !important;
    }
}
</style>


<style lang="scss" scoped>
@import "~@/css/variables.scss";
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
    .left {
        width: 160px;
        background: #f7f7f7;
        position: relative;
        border-bottom-left-radius: 3px;
        overflow: hidden;
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
        .operation {
            position: absolute;
            bottom: 0;
            width: 100%;
            .item {
                height: 50px;
                line-height: 50px;
                display: flex;
                font-size: 14px;
                justify-content: center;
                cursor: pointer;
                .progress-area {
                    position: absolute;
                    left: 0;
                    width: 0%;
                    height: 100%;
                    background: #5cc9f5;
                    z-index: 1;
                    animation: 0.2s;
                }
                .upload-demo {
                    position: relative;
                    z-index: 2;
                    .txt {
                        color: #526069;
                    }
                    &:hover {
                        .txt {
                            color: #68cbf7;
                        }
                    }
                }
                &:nth-child(1) {
                    border-top: 1px solid #e6ebed;
                    // border-bottom: 1px solid #e6ebed;
                }
            }
        }
    }
    .right {
        flex: 1;
        position: relative;
        .nav {
            border-bottom: 1px solid #ccc;
            margin: 0 20px;
            .nav-list {
                display: flex;
                flex-wrap: wrap;
                padding-top: 15px;
                padding-bottom: 5px;
                li {
                    line-height: 30px;
                    margin-right: 30px;
                    font-size: 12px;
                    cursor: pointer;
                    &.active,
                    &:hover {
                        color: #1593ff;
                    }
                }
            }
            .tag-list {
                display: flex;
                flex-wrap: wrap;
                li {
                    line-height: 30px;
                    margin-right: 15px;
                    font-size: 12px;
                    cursor: pointer;
                    &.active {
                        color: #1593ff;
                    }
                }
            }
        }

        .right-content {
            position: relative;
            min-height: 400px;
            margin: 15px 20px;
            padding-bottom: 52px;
            .no-list {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                flex-direction: column;
                img {
                    margin-top: 70px;
                }
                p {
                    margin-top: 30px;
                }
            }
            .footer {
                position: absolute;
                width: 100%;
                bottom: 0;
            }
        }
    }
}
</style>