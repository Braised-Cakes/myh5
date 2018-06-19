<template>
    <div>
        <div class="setting-bg"></div>
        <div class="left">
            <div class="phone" v-html="html"></div>
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
                <el-select @change="fff" size="mini" v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
                <el-checkbox @change="fff" v-model="checked">是否循环播放</el-checkbox>
            </div>
            <div class="setting-operations">
                <el-button @click="save">确定</el-button>
                <el-button @click="CLOSE_PANEL('SET')">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import $ from "jquery";
import * as api from "@/api/index";
import dataTpl from "@/tpl/tpl.art";
import runtime from "art-template/lib/runtime";
import * as utils from "../../../utils/index";
/**
 * 翻页方式 effect
 * 是否循环播放 loop
 * 自动播放->时间   autoplay
 *
 */
runtime.parseStyle = function(date) {
    let str = "";
    for (let attr in date) {
        str += attr + ":" + date[attr] + ";";
    }
    return str;
};

export default {
    computed: {
        ...mapGetters(["otherInfo", "phoneData"]),
        formData() {
            return $.extend(true, {}, this.otherInfo);
        }
    },
    data() {
        return {
            options: [
                {
                    key: "slide",
                    label: "位移切换"
                },
                {
                    key: "fade",
                    label: "淡入"
                },
                {
                    key: "cube",
                    label: "方块"
                },
                {
                    key: "coverflow",
                    label: "3d流"
                },
                {
                    key: "flip",
                    label: "3d翻转"
                }
            ],
            value: "cube",
            checked: false,
            html: "",
            swiper: null
        };
    },
    methods: {
        ...mapMutations(["CLOSE_PANEL"]),
        save() {
            api.updateScene(this.formData).then(res => {
                console.log(res);
            });
        },
        fff() {
            this.resetSwiper();
        },
        resetSwiper() {
            let realIndex = this.swiper && this.swiper.realIndex;
            this.swiper && this.swiper.destroy();
            this.html = "";
            this.$nextTick(() => {
                this.html = dataTpl({
                    data: this.phoneData.data
                });
                this.$nextTick(() => {
                    this.swiper = new window.Swiper(".swiper-container", {
                        direction: "vertical",
                        effect: this.value,
                        loop: this.checked,
                        initialSlide: realIndex,
                        onSlideChangeStart(swiper) {
                            $(".swiper-slide")
                                .eq(swiper.activeIndex)
                                .each((index, item) => {
                                    $(item)
                                        .find(".items")
                                        .each((index2, item2) => {
                                            $("." + $(item2).attr("id")).css(
                                                "animation",
                                                ""
                                            );
                                            $("." + $(item2).attr("id")).show();
                                            utils.runAni(
                                                $(item2).attr("id"),
                                                JSON.parse(
                                                    $(
                                                        "." +
                                                            $(item2).attr("id")
                                                    ).attr("data-ani")
                                                )
                                            );
                                        });
                                });
                        }
                    });
                });
            });
        }
    },
    mounted() {
        this.html = dataTpl({
            data: this.phoneData.data
        });
        this.$nextTick(() => {
            this.resetSwiper();
        });
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
