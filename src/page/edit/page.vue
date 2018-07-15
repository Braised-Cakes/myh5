<template>
    <div class="create_right">
        <ul class="top">
            <li v-if="!hasSelectedItems" @click="nav = 1" :class="{ active: nav == 1 }">页面属性</li>
            <li v-else @click="nav = 1" :class="{ active: nav == 1 }">元素属性</li>
            <li @click="nav = 0" :class="{ active: nav == 0 }">页面管理</li>
        </ul>
        <section v-if="nav == 0">
            <el-scrollbar class="page-component__nav">
                <ul class="page_ul">
                    <draggable v-model="myList" :move="move" @start="start" @end="end">
                        <transition-group>
                            <li @click.stop="selectPage({ page: index })" :class="{'active': index == currentPage, 'drag' : drag && index == oldIndex}" v-for="(item, index) in myList" :key="index">
                                <div v-if="!(drag && index == oldIndex)">
                                    <span>
                                        <em>{{index + 1}}</em>
                                    </span>
                                    <span @click.stop="delPage(index)">
                                        <i class="icon iconfont icon-fuzhi"></i>
                                    </span>
                                </div>
                            </li>
                        </transition-group>
                    </draggable>
                </ul>
            </el-scrollbar>
            <div class="bottom">
                <el-button type="primary" icon="el-icon-plus" @click="addPage">新增一页</el-button>
            </div>
        </section>
        <section v-else>
            <edit-dom v-if="hasSelectedOneItem"></edit-dom>
            <page-dom v-else></page-dom>
        </section>

    </div>
</template>
<script>
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
import EditDom from "./edit-dom";
import PageDom from "./page-dom";

export default {
    components: {
        "edit-dom": EditDom,
        "page-dom": PageDom,
        draggable
    },
    computed: {
        ...mapGetters([
            "currentPage",
            "hasSelectedItems",
            "hasSelectedOneItem"
        ]),
        myList: {
            get() {
                return this.$store.getters.phoneData.data;
            },
            set(value) {
                this.sortPage({
                    futureIndex: this.futureIndex,
                    value: value
                });
            }
        }
    },
    methods: {
        ...mapActions(["addPage", "selectPage", "delPage", "sortPage"]),
        move(originalEvent) {
            this.oldIndex = originalEvent.draggedContext.index;
            this.futureIndex = originalEvent.draggedContext.futureIndex;
        },
        start(originalEvent) {
            this.drag = true;
            this.oldIndex = this.futureIndex = originalEvent.oldIndex;
        },
        end() {
            this.drag = false;
        }
    },
    data() {
        return {
            oldIndex: -1,
            futureIndex: -1,
            drag: false,
            nav: 1
        };
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/variables.scss";
@import "~@/css/mixin";

$panelNavHeight: 50px;
$bottomHeight: 36px;
$bottomBottom: 10px;

.create_right {
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    bottom: 0;
    width: 260px;
    z-index: $pageZIndex;
    background-color: #fff;
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.16);
    .page-component__nav {
        height: calc(
            100vh - #{$headerHeight + $panelNavHeight + $bottomHeight +
                $bottomBottom}
        );
    }
    .top {
        @include fj;
        li {
            text-align: center;
            flex: 1;
            background: #e0e0e0;
            @include sc(14px, #000);
            height: $panelNavHeight;
            line-height: $panelNavHeight;
            transition: 0.3s;
            cursor: pointer;
            &.active {
                background: #fff;
                font-weight: 700;
            }
            &:hover {
                font-weight: 700;
            }
        }
    }
    .page_ul {
        li {
            height: 70px;
            cursor: pointer;
            @include sc(12px, #76838f);
            position: relative;
            border-bottom: 1px solid #e6ebed;
            &:first-child {
                border-top: 1px solid #e6ebed;
            }
            &:hover {
                background: #fafafa;
            }
            &.active {
                background: #fafafa;
                em {
                    background: #2495fc;
                }
                .icon {
                    color: #666;
                }
            }
            &.drag {
                background: #fff996;
            }
            div {
                @include fj(space-around);
                align-items: center;
                height: 100%;
                span {
                    em {
                        display: inline-block;
                        @include wh(24px, 24px);
                        line-height: 24px;
                        text-align: center;
                        border-radius: 12px;
                        background-color: #ccc;
                        color: #fff;
                    }
                    .icon {
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .bottom {
        text-align: center;
        .el-button {
            @include wh(106px, 36px);
        }
    }
}
</style>