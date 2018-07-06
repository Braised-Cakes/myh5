<template>
    <div class="workspace"
        v-my-select
        @mousedown.stop="cancelSelect">
        <div class="container">
            <div class="phone-bg"></div>
            <div class="phone-area"
                v-if="currentPhone"
                :style="{ 'background-color' : currentPhone.main['background-color'], 'background-image' : `url(${currentPhone.main['background-image']})`, 'opacity' : currentPhone.main['opacity'] }">
                <div :id="item.id"
                    :key="item.id"
                    v-my-drag
                    @mousedown.stop="select(index)"
                    class="phone-item"
                    :style="item.style | filterItemWrap"
                    v-for="(item, index) in currentPhone.data">
                    <!-- <div class="item-body" :style="item.style | filterItem" v-html="item.content.replace(/\n/g, '<br>')"></div> -->
                    <div class="item-body"
                        style="width:100%;height:100%"
                        :style="item.style | filterItem"
                        v-html="item.content"></div>
                    <!-- <div v-if="item.type == 'shape'" class="item-body" style="width:100%;height:100%" :style="item.style | filterItem" v-html="highlight(item)"></div> -->
                    <div v-if="curItemId == index || curItemIds.indexOf(index) != -1"
                        style="position:absolute;border:1px solid #1ea3ec;width:100%;height:100%;top:0;left:0;">
                        <div v-my-changesize="{type : 'nw'}"
                            class="circle circle-nw"></div>
                        <div v-my-changesize="{type : 'n'}"
                            class="circle circle-n"></div>
                        <div v-my-changesize="{type : 'ne'}"
                            class="circle circle-ne"></div>
                        <div v-my-changesize="{type : 's'}"
                            class="circle circle-s"></div>
                        <div v-my-changesize="{type : 'sw'}"
                            class="circle circle-sw"></div>
                        <div v-my-changesize="{type : 'w'}"
                            class="circle circle-w"></div>
                        <div v-my-changesize="{type : 'se'}"
                            class="circle circle-se"></div>
                        <div v-my-changesize="{type : 'e'}"
                            class="circle circle-e"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";

export default {
    filters: {
        filterItemWrap(res) {
            var json = {};
            for (let attr in res) {
                if (
                    attr == "position" ||
                    attr == "left" ||
                    attr == "width" ||
                    attr == "height" ||
                    attr == "top" ||
                    attr == "z-index"
                ) {
                    json[attr] = res[attr];
                }
            }
            return json;
        },
        filterItem(res) {
            var json = {};
            for (let attr in res) {
                if (
                    attr == "position" ||
                    attr == "left" ||
                    attr == "top" ||
                    attr == "width" ||
                    attr == "height" ||
                    attr == "z-index"
                ) {
                    //console.log(2)
                } else {
                    json[attr] = res[attr];
                }
            }
            return json;
        }
    },
    computed: {
        ...mapGetters(["currentPhone", "curItem", "curItemId", "curItemIds"])
    },
    methods: {
        ...mapActions(["selectItem", "cancelSelect", "updateItem"]),
        select(index) {
            this.selectItem(index);
            if (this.curItem.type == "shape") {
                var arr = [];
                $(this.curItem.content)
                    .find("*")
                    .each((index, item) => {
                        if (
                            $(item).attr("fill") &&
                            arr.every(item2 => {
                                return item2.fill != $(item).attr("fill");
                            })
                        ) {
                            arr.push({
                                fill: $(item).attr("fill"),
                                css: $(item).css("fill")
                            });
                        }
                    });
                console.log(arr);
                // this.updateItem
                // this.panel.fillColorList = arr;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";
@import "~@/css/variables.scss";

.workspace {
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 260px;
    z-index: $workspaceZIndex;
    .container {
        @include wh(328px, 560px);
        position: absolute;
        top: 5%;
        left: 20%;
        .phone-bg {
            background: url(~@/img/phonewhite.svg);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            border-radius: 40px;
            width: 328px;
            height: 560px;
        }
        .phone-area {
            position: absolute;
            @include wh(320px, 486px);
            top: 37px;
            left: 4px;
            /** public **/
            background-color: #fff;
            background-size: cover;
            background-position: 50% 50%;
            background-origin: content-box;
            /** end public **/
            .phone-item {
                $size: 12px;
                $halfSize: 6px;
                $position: -6px;
                .circle {
                    width: $size;
                    height: $size;
                    background-color: #fff;
                    border: 1px solid #59c7f9;
                    border-radius: 12px;
                    position: absolute;
                    &.circle-nw {
                        left: $position;
                        top: $position;
                        cursor: nw-resize;
                    }
                    &.circle-n {
                        left: 50%;
                        margin-left: -$halfSize;
                        top: $position;
                        cursor: n-resize;
                    }
                    &.circle-ne {
                        right: $position;
                        top: $position;
                        cursor: ne-resize;
                    }
                    &.circle-s {
                        left: 50%;
                        margin-left: -$halfSize;
                        bottom: $position;
                        cursor: s-resize;
                    }
                    &.circle-sw {
                        left: $position;
                        bottom: $position;
                        cursor: sw-resize;
                    }
                    &.circle-w {
                        left: $position;
                        top: 50%;
                        margin-top: -$halfSize;
                        cursor: w-resize;
                    }
                    &.circle-se {
                        right: $position;
                        bottom: $position;
                        cursor: se-resize;
                    }
                    &.circle-e {
                        right: $position;
                        top: 50%;
                        margin-top: -$halfSize;
                        cursor: e-resize;
                    }
                }
            }
        }
    }
}
</style>
