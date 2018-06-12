<template>
    <transition>
        <div v-if="isActive" class="wrapper">
            <div class="header">
                <h4>图片库</h4>
                <span class="close">x</span>
            </div>
            <div class="main">
                <div class="left">
                    <img id="image" :src="src">
                </div>
                <div class="right">
                    <el-radio-group :value="type" size="small">
                        <el-radio @change="change(item)" :key="item.type" v-for="item in list" :label="item.type">{{item.name}}</el-radio>
                    </el-radio-group>
                    <div>
                        <el-button @click="close" size="mini">取消</el-button>
                        <el-button @click="confirm" size="mini" type="success">确定</el-button>
                    </div>
                </div>
            </div>
        </div>
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

 */
import "cropper";
export default {
    data() {
        return {
            isActive: false,
            callback: () => {},
            type: "original",
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
            data: {}
        };
    },
    methods: {
        init(params) {
            let { src, callback, data = {} } = params;
            this.isActive = true;
            var img = new Image();
            img.src = src;
            this.type = (data && data.type) || "original";
            img.onload = () => {
                this.src = src;
                this.$nextTick().then(() => {
                    this.image = $("#image");
                    let radio = img.width / img.height;
                    this.list[0].radio = radio;
                    this.radio = data.width / data.height || radio;
                    this.image.cropper({
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
            this.isActive = false;
        },
        close() {
            this.callback({
                action: "cancel"
            });
            this.isActive = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/variables.scss";
.wrap {
    position: relative;
    z-index: 1231231;
    width: 620px;
    height: 520px;
    background: #fff;
}
img {
    max-width: 100%; /* This rule is very important, please do not ignore this! */
}

.wrapper {
    width: 970px;
    background: #fff;
    border-radius: 6px;
    z-index: $panelZIndex;
    position: absolute;
    overflow: hidden;
    left: 100px;
    top: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
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
            width: 620px;
            height: 520px;
        }
    }
}
</style>
