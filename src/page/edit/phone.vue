<template>
    <div class="workspace" v-my-select @mousedown.stop="cancelSelect">
        <div class="container">
            <div class="phone-bg"></div>
            <div class="phone-area" v-if="currentPhone" :style="areaStyle">
                <div :id="item.id" :key="item.id" v-my-drag @mousedown.stop="selectItem(index)" class="phone-item" :style="item.style | filterItemStyle(true)" v-for="(item, index) in currentPhone.data">
                    <div class="item-body" :style="item.style | filterItemStyle" v-html="$options.filters.filterItemContent(item)"></div>
                    <div class="item-drag-wrap" v-if="curItemId == index || curItemIds.indexOf(index) != -1">
                        <div v-my-changesize="{type : 'nw'}" class="circle circle-nw"></div>
                        <div v-my-changesize="{type : 'n'}" class="circle circle-n"></div>
                        <div v-my-changesize="{type : 'ne'}" class="circle circle-ne"></div>
                        <div v-my-changesize="{type : 's'}" class="circle circle-s"></div>
                        <div v-my-changesize="{type : 'sw'}" class="circle circle-sw"></div>
                        <div v-my-changesize="{type : 'w'}" class="circle circle-w"></div>
                        <div v-my-changesize="{type : 'se'}" class="circle circle-se"></div>
                        <div v-my-changesize="{type : 'e'}" class="circle circle-e"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    filters: {
        /**
         * 当前页的cache数据
         * @param {Object} style 当前元素样式
         * @param {Number} outer true: 挂载到元素根dom, false: 挂载到元素内层
         */
        filterItemStyle(style, outer) {
            let outerJson = {};
            let innerJson = {};
            for (let attr in style) {
                if (/^position|left|width|height|top|z-index$/.test(attr)) {
                    outerJson[attr] = style[attr];
                } else {
                    innerJson[attr] = style[attr];
                }
            }
            return outer ? outerJson : innerJson;
        },
        filterItemContent({ type, content }) {
            if (type == "txt") {
                return content.replace(/\n/g, "<br>");
            } else {
                return content;
            }
        }
    },
    computed: {
        ...mapGetters(["currentPhone", "curItem", "curItemId", "curItemIds"]),
        areaStyle: function() {
            return {
                "background-color": this.currentPhone.main["background-color"],
                "background-image": `url(${
                    this.currentPhone.main["background-image"]
                })`,
                opacity: this.currentPhone.main["opacity"]
            };
        }
    },
    methods: {
        ...mapActions(["selectItem", "cancelSelect", "updateItem"])
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
            @include wh(328px, 560px);
            background: url(~@/img/phonewhite.svg);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            border-radius: 40px;
        }
        .phone-area {
            @include wh(320px, 486px);
            position: absolute;
            top: 37px;
            left: 4px;
            /** public **/
            background-color: #fff;
            background-size: cover;
            background-position: 50% 50%;
            background-origin: content-box;
            /** end public **/
            .item-body {
                @include wh(100%, 100%);
            }
            .item-drag-wrap {
                position: absolute;
                border: 1px solid #1ea3ec;
                @include wh(100%, 100%);
                top: 0;
                left: 0;
            }
            .phone-item {
                $size: 12px; /* 小圆圈的尺寸 */
                $position: -6px;
                .circle {
                    @include wh($size, $size);
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
                        @include cl;
                        top: $position;
                        cursor: n-resize;
                    }
                    &.circle-ne {
                        right: $position;
                        top: $position;
                        cursor: ne-resize;
                    }
                    &.circle-s {
                        @include cl;
                        bottom: $position;
                        cursor: s-resize;
                    }
                    &.circle-sw {
                        left: $position;
                        bottom: $position;
                        cursor: sw-resize;
                    }
                    &.circle-se {
                        right: $position;
                        bottom: $position;
                        cursor: se-resize;
                    }
                    &.circle-w {
                        left: $position;
                        @include ct;
                        cursor: w-resize;
                    }

                    &.circle-e {
                        right: $position;
                        @include ct;
                        cursor: e-resize;
                    }
                }
            }
        }
    }
}
</style>
