<template>
    <div class="wrapper">
        <div class="header">
            <h4>图片库</h4>
            <span class="close">x</span>
        </div>
        <div class="main">
            <div class="left">
                <img id="image" src="http://p7h1y3vg2.bkt.clouddn.com/03tf72538229.jpg">
            </div>
            <div class="right">
                <el-radio-group  :value="id" size="small">
                    <el-radio @change="change(item)" v-for="item in list" :label="item.id">{{item.name}}</el-radio>
                </el-radio-group>
                <div>
                    <el-button size="mini">取消</el-button>
                    <el-button size="mini" type="success">确定</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
// http://p7h1y3vg2.bkt.clouddn.com/03tf72538229.jpg?imageMogr2/crop/!400x300a0a100
import Cropper from "cropper";
export default {
    data() {
        return {
            id: "原图比例",
            load: false,
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
            radio: ""
        };
    },
    methods: {
        change(item) {
            this.id = item.id;
            this.radio = item.radio;
            this.image && this.image.cropper("setAspectRatio", this.radio);
        }
    },
    mounted() {
        var img = new Image();
        img.src = "http://p7h1y3vg2.bkt.clouddn.com/03tf72538229.jpg";
        img.onload = () => {
            this.image = $("#image");
            this.list[0].radio = this.radio = img.width / img.height;
            this.image.cropper({
                viewMode: 1,
                dragMode: "none",
                zoomable: false,
                aspectRatio: this.radio
            });
            // this.$nextTick().then(() => {
            //     this.load = true;
            // });
        };
        // Get the Cropper.js instance after initialized
        $("#confirm").on("click", function() {
            let result = this.image.cropper("getData");
            document.title = result;
        });
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
