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
                    <el-radio-group :value="id" size="small">
                        <el-radio @change="change(item)" :key="item.id" v-for="item in list" :label="item.id">{{item.name}}</el-radio>
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
// http://p7h1y3vg2.bkt.clouddn.com/03tf72538229.jpg?imageMogr2/crop/!400x300a0a100

/**

调用方式
this.$crop({
    img : 'http://p7h1y3vg2.bkt.clouddn.com/03tf72538229.jpg',
    callback:()=>{

    }
})
 */
import Cropper from "cropper";
export default {
    data() {
        return {
            isActive: false,
            callback: () => {},
            id: "原图比例",
            list: [
                {
                    name: "原图比例",
                    radio: -1,
                    id: "原图比例"
                },
                {
                    name: "1:1",
                    radio: 1,
                    id: "1:1"
                },
                {
                    name: "4:3",
                    radio: 4 / 3,
                    id: "4:3"
                },
                {
                    name: "3:4",
                    radio: 3 / 4,
                    id: "3:4"
                },
                {
                    name: "标准屏比例",
                    radio: 320 / 486,
                    id: "标准屏比例"
                },
                {
                    name: "1/2屏比例",
                    radio: 320 / 486 * 2,
                    id: "1/2屏比例"
                },
                {
                    name: "1/3屏比例",
                    radio: 320 / 486 * 3,
                    id: "1/3屏比例"
                },
                {
                    name: "自定义",
                    radio: "",
                    id: "自定义"
                }
            ],
            image: null,
            src: "",
            radio: ""
        };
    },
    methods: {
        init(params) {
            let { src, callback } = params;
            this.isActive = true;
            var img = new Image();
            img.src = src;
            img.onload = () => {
                this.src = src;
                this.$nextTick().then(() => {
                    this.image = $("#image");
                    this.list[0].radio = this.radio = img.width / img.height;
                    this.image.cropper({
                        viewMode: 1,
                        dragMode: "none",
                        zoomable: false,
                        aspectRatio: this.radio
                    });
                });
            };
            this.callback = callback;
        },
        change({ id, radio }) {
            this.id = id;
            this.radio = radio;
            this.image && this.image.cropper("setAspectRatio", radio);
        },
        confirm() {
            let { x, y, width, height } = this.image.cropper("getData");
            this.callback({
                action: "confirm",
                data: { x, y, width, height },
                src: `${this.src}?imageMogr2/crop/!${parseInt(
                    width
                )}x${parseInt(height)}a${parseInt(x)}a${parseInt(y)}`
            });
            this.isActive = false;
        },
        close() {
            this.callback({
                action: "confirm"
            });
            this.isActive = false;
        }
    },
    mounted() {
        // var img = new Image();
        // img.src = this.src;
        // img.onload = () => {
        //     this.image = $("#image");
        //     this.list[0].radio = this.radio = img.width / img.height;
        //     this.image.cropper({
        //         viewMode: 1,
        //         dragMode: "none",
        //         zoomable: false,
        //         aspectRatio: this.radio
        //     });
        // };
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
