<template>
    <header>
        <div class="logo">
            <router-link to="/list">
                <img src="@/img/logo.png" />
            </router-link>
        </div>
        <ul class="create-panel">
            <li :key="item.label" v-for="item in panelList" @click="beforeCreate(item.type)">
                <i class="icon iconfont" :class="{['icon-' + item.type]: true}"></i>
                <span>{{item.label}}</span>
            </li>
        </ul>
        <ul class="user-operation">
            <li @click="OPEN_PANEL('SET')">
                <span>预览和设置</span>
            </li>
            <li @click="save">
                <span>保存</span>
            </li>
            <li @click="publish">
                <span>发布</span>
            </li>
            <router-link class="quit" tag="li" :to="'/list'">
                <span>退出</span>
            </router-link>
        </ul>
    </header>
</template>
<script>
import $ from "jquery";
import { mapActions, mapGetters, mapMutations } from "vuex";
import * as api from "@/api/index";
import * as types from "@/tpl/types.js";

export default {
    computed: {
        ...mapGetters(["phoneData"])
    },
    methods: {
        ...mapActions(["addItem"]),
        ...mapMutations(["OPEN_PANEL"]),
        //保存场景
        async save() {
            let data = $.extend(true, {}, this.phoneData);
            //干掉形状的content
            data.data.forEach(item => {
                item.data.forEach(item => {
                    if (item.type == types.SHAPE) {
                        item.content = "";
                    }
                });
            });
            await api.saveScene({
                id: this.$route.params.id,
                data: data
            });
            this.$alert("保存成功", {
                closeOnClickModal: true,
                callback: () => {}
            });
        },
        //发布场景
        async publish() {
            await api.publishScene({
                id: this.$route.params.id
            });
            this.$alert("发布成功", {
                closeOnClickModal: true,
                callback: () => {}
            });
        },
        //创建元素前
        beforeCreate(type) {
            if (type == types.IMAGE) {
                this.$image({
                    callback: ({ path }) => {
                        let img = new Image();
                        img.src = path;
                        img.onload = () => {
                            this.addItem({
                                type: types.IMAGE,
                                path: path,
                                width: img.width,
                                height: img.height
                            });
                        };
                    }
                });
            } else if (type == types.SHAPE) {
                this.$shape({
                    callback: ({ path }) => {
                        let dom = $(`<embed src="/store/${path}"></embed>`);
                        $(dom).on("load", () => {
                            let docs = dom[0].getSVGDocument();
                            $(dom).remove();
                            this.addItem({
                                type: types.SHAPE,
                                path: path,
                                content: $(docs)
                                    .find("svg")
                                    .prop("outerHTML")
                                    .match(/<svg[\s\S]+/)[0]
                            });
                        });
                        $("#svg_cache").append(dom);
                    }
                });
            } else if (type == types.TXT) {
                this.addItem(type);
            }
        }
    },
    data() {
        return {
            panelList: [
                {
                    label: "文本",
                    type: types.TXT
                },
                {
                    label: "图片",
                    type: types.IMAGE
                },
                {
                    label: "形状",
                    type: types.SHAPE
                },
                {
                    label: "音乐",
                    type: types.MUSIC
                },
                {
                    label: "二维码",
                    type: types.QRCODE
                }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";
@import "~@/css/variables.scss";
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $headerHeight;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: $headerZIndex;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
}
.logo {
    @include wh(72px, 100%);
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
.create-panel {
    display: flex;
    li {
        @include wh(60px, $headerHeight);
        @include sc(13px, #333);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .icon {
            font-size: 20px;
            margin-bottom: 5px;
        }
        &:hover {
            background: #2495fc;
            color: #fff;
        }
    }
}
.user-operation {
    display: flex;
    li {
        padding: 0 8px;
        margin-right: 8px;
        cursor: pointer;
        text-align: center;
        border-radius: 3px;
        background-color: #1593ff;
        transition: 0.3s;
        line-height: 32px;
        @include sc(12px, #fff);
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
</style>
