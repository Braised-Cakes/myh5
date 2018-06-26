<template>
    <transition>
        <el-dialog @close="close" :width="width" class="my-el-dialog" :visible.sync="visible" :show-close="false">
            <div class="wrapper">
                <div class="header">
                    <h4>图片裁切</h4>
                    <span class="close" @click="close">x</span>
                </div>
                <div class="main" :class="{'main1' : !hasRight, 'main2' : hasRight}">
                    <div class="left" v-loading="loading" style="overflow:hidden;" element-loading-background="rgba(0, 0, 0, 0.8)">
                        <img id="image" :src="src" />
                    </div>
                    <div v-if="!hasRight" class="operation" style="margin-top:28px;align-self:flex-end;">
                        <el-button @click="close" style="width:96px;" size="medium">取消</el-button>
                        <el-button @click="confirm" style="width:96px;" size="medium" type="primary">确定</el-button>
                    </div>
                    <div class="right" v-if="hasRight">
                        <h3>裁切比例</h3>
                        <ul class="ul">
                            <li :key="item.type" v-for="item in list">
                                <el-radio @change="change(item)" :value="type" :label="item.type">{{item.name}}</el-radio>
                            </li>
                        </ul>
                        <div class="operation">
                            <el-button @click="close" size="medium">取消</el-button>
                            <el-button @click="confirm" size="medium" type="primary">确定</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>

    </transition>
</template>

<script>
import $ from "jquery";
// http://p7d4z759a.bkt.clouddn.com/03tf72538229.jpg?imageMogr2/crop/!400x300a0a100

/**


对外api


this.$crop({
    src : 'http://p7d4z759a.bkt.clouddn.com/03tf72538229.jpg',
    data : {
        tpye : 'original',
        x : 0,
        y : 0,
        width : 100,
        height : 100
    },
    callback:()=>{

    }
})

传参，  固定1比1


传参 1:1

 */
import "cropper";
import vDialog from "@/components/dialog/dialog.vue";
export default {
    components: {
        vDialog
    },
    data() {
        return {
            visible: false,
            callback: () => {},
            type: "original",
            width: "auto",
            loading: true,
            list: [
                {
                    name: "原图比例",
                    radio: -1,
                    type: "original"
                },
                {
                    name: "1:1",
                    radio: 1,
                    type: "1:1"
                },
                {
                    name: "4:3",
                    radio: 4 / 3,
                    type: "4:3"
                },
                {
                    name: "3:4",
                    radio: 3 / 4,
                    type: "3:4"
                },
                {
                    name: "标准屏比例",
                    radio: 320 / 486,
                    type: "screen"
                },
                {
                    name: "1/2屏比例",
                    radio: 320 / 486 * 2,
                    type: "screen/2"
                },
                {
                    name: "1/3屏比例",
                    radio: 320 / 486 * 3,
                    type: "screen/3"
                },
                {
                    name: "自定义",
                    radio: "",
                    type: "diy"
                }
            ],
            image: null,
            src: "",
            radio: "",
            data: {},
            hasRight: false
        };
    },
    methods: {
        close() {
            this.image.cropper("destroy");
            this.visible = false;
        },
        init(params) {
            let { src, callback, data = {}, hasRight } = params;
            this.visible = true;
            var img = new Image();
            src = src.replace(/\?.+/g, "");
            img.src = src;
            this.type = (data && data.type) || "original";
            this.hasRight = hasRight;
            this.loading = true;
            this.width = this.hasRight ? "914px" : "996px";

            img.onload = () => {
                this.src = src;
                this.$nextTick().then(() => {
                    this.image = $("#image");
                    let radio = img.width / img.height;
                    this.list[0].radio = radio;
                    this.radio = data.width / data.height || radio;
                    this.image.cropper({
                        ready: () => {
                            this.loading = false;
                        },
                        viewMode: 1,
                        dragMode: "none",
                        zoomable: false,
                        data: data,
                        aspectRatio: this.radio
                    });
                });
            };
            this.callback = callback;
        },
        change({ type, radio }) {
            this.type = type;
            this.radio = radio;
            this.image && this.image.cropper("setAspectRatio", radio);
        },
        confirm() {
            let data = this.image.cropper("getData");
            data.x = parseInt(data.x);
            data.y = parseInt(data.y);
            data.width = parseInt(data.width);
            data.height = parseInt(data.height);
            data.type = this.type;
            this.callback({
                action: "confirm",
                data: data,
                src: `${this.src}${
                    this.src.indexOf("?") == -1 ? "?" : "|"
                }imageMogr2/crop/!${data.width}x${data.height}a${parseInt(
                    data.x
                )}a${parseInt(data.y)}`
            });
            this.close();
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/variables.scss";
img {
    max-width: 100%; /* This rule is very important, please do not ignore this! */
}
.wrapper {
    background: #fff;
    overflow: hidden;
    .header {
        padding: 15px 20px;
        min-height: 21px;
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
        padding: 0 28px 28px 28px;
        .left {
            position: relative;
        }
        .right {
            width: 284px;
            padding: 28px 0 0 28px;
            position: relative;
            h3 {
                font-weight: bold;
                font-size: 14px;
                color: #111;
                line-height: 48px;
            }
            .ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 50%;
                    line-height: 36px;
                }
            }
            .operation {
                position: absolute;
                bottom: 0px;
                display: flex;
                width: 256px;
                .el-button {
                    width: 50%;
                }
            }
        }
    }
    .main1 {
        flex-direction: column;
        .left {
            width: 940px;
            height: 448px;
        }
    }
    .main2 {
        flex-direction: row;
        .left {
            width: 574px;
            height: 492px;
        }
    }
}
</style>
