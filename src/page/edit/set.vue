<template>
    <div>
        <div class="setting-bg"></div>
        <div class="left">
            <div class="phone">
                <div id="wrapAll">
                    <div style="100%;height:100%;" v-html="html"></div>
                    <div id="musicBtn" class="rotate" style="z-index:999;position:absolute;right:50px;width:30px;height:30px;top:50px;">
                        <img src="@/img/music_btn.svg" />
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="basic-info">
                <div class="cover-img">
                    <img :src="formData.portrait" />
                    <span @click="changeImg">更换封面</span>
                </div>
                <div>
                    <span>标题</span>
                    <el-input v-model="formData.title"></el-input>
                    <span>描述</span>
                    <el-input v-model="formData.desc"></el-input>
                </div>
            </div>
            <!-- <div>
                <h4>翻页方式</h4>
                <el-select @change="fff" size="mini" v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key">
                    </el-option>
                </el-select>
                <el-checkbox @change="fff" v-model="checked">是否循环播放</el-checkbox>
            </div> -->
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
        ...mapGetters(["otherInfo", "phoneData"])
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
            value: "slide",
            checked: true,
            html: "",
            swiper: null,
            formData: {}
        };
    },
    methods: {
        ...mapMutations(["CLOSE_PANEL"]),
        save() {
            api.updateScene(this.formData).then(res => {
                console.log(res);
                this.CLOSE_PANEL("SET");
            });
        },
        fff() {
            this.resetSwiper();
        },
        changeImg() {
            this.$image({
                callback: ({ path }) => {
                    this.$crop({
                        src: path,
                        data: {
                            type: "1:1",
                            width: 400,
                            height: 400
                        },
                        hasRight: false,
                        callback: ({ src }) => {
                            this.formData.portrait = src;
                        }
                    });
                }
            });
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
        this.formData = $.extend(true, {}, this.otherInfo);
        this.html = dataTpl({
            data: this.phoneData.data
        });
        this.$nextTick(() => {
            this.resetSwiper();
        });
        //音乐控制按钮， 默认自动播放
        let music = true;
        $("#musicBtn").on("click", function() {
            if (music) {
                $(this).css("animation-play-state", "paused");
            } else {
                $(this).css("animation-play-state", "running");
            }
            music = !music;
        });
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";

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
        @include wh(326px, 596px);
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
    @include sc(12px, #76838f);
    .basic-info {
        display: flex;
        .cover-img {
            @include wh(180px, 180px);
            margin-right: 20px;
            position: relative;
            span {
                position: absolute;
                left: 45px;
                bottom: 20px;
                @include wh(90px, 30px);
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
