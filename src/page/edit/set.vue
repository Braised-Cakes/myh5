<template>
    <div>
        <div class="setting-bg"></div>
        <div class="left">
            <div class="phone">
                <div class="swiper-container" id="wrapAll" v-html="html"></div>
            </div>
        </div>
        <div class="right">
            <div class="basic-info">
                <div class="cover-img">
                    <img src="@/img/logo2.png" />
                    <span>更换封面</span>
                </div>
                <div>
                    <span>标题</span>
                    <el-input v-model="formData.title"></el-input>
                    <span>描述</span>
                    <el-input v-model="formData.desc"></el-input>
                </div>
            </div>
            <div>
                <h4>翻页方式</h4>
                <el-select size="mini" v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="setting-operations">
                <el-button @click="save">确定</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";
import * as api from "@/api/index";
import dataTpl from "@/tpl/tpl.art";
// var template = require('art-template');
// console.log(template);
console.log(dataTpl)
export default {
    computed: {
        ...mapGetters(["otherInfo", "phoneData"])
    },
    watch: {
        otherInfo: {
            handler: function(val) {
                this.formData = $.extend(true, {}, val);
                this.formData.id = this.$route.params.id;
            },
            deep: true
        }
    },
    data() {
        return {
            formData: {
                id: this.$route.params.id,
                title: "",
                desc: ""
            },
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value: "选项1",
            html: "laskdfj"
        };
    },
    methods: {
        save() {
            api.updateScene(this.formData).then(res => {
                console.log(res);
            });
        }
    },
    mounted() {
        // this.html = this.phoneData.data;
    }
};
</script>
<style lang="scss" scoped>
.setting-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 56px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1042;
}
.left {
    position: fixed;
    top: 56px;
    bottom: 0;
    left: 0;
    right: 640px;
    z-index: 1050;
    overflow: hidden;
    .phone {
        width: 326px;
        height: 596px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -163px;
        margin-top: -298px;
        background: url(~@/img/bg.svg);
        #wrapAll {
            width: 318px;
            height: 486px;
            overflow: hidden;
            position: absolute;
            left: 50%;
            top: 83px;
            margin-left: -159px;
        }
    }
}
.right {
    position: fixed;
    width: 640px;
    top: 56px;
    right: 0;
    padding: 20px;
    bottom: 0;
    z-index: 1050;
    background-color: #fff;
    overflow-y: auto;
    font-size: 12px;
    color: #76838f;
    .basic-info {
        display: flex;
        .cover-img {
            width: 180px;
            height: 180px;
            margin-right: 20px;
            position: relative;
            span {
                position: absolute;
                left: 45px;
                bottom: 20px;
                height: 30px;
                width: 90px;
                text-align: center;
                line-height: 30px;
                border: 1px solid #ccd5db;
                cursor: pointer;
                border-radius: 3px;
                background-color: #f7f7f7;
            }
        }
    }
}
</style>
