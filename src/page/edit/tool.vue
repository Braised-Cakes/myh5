<template>
    <ul class="tool-list">
        <li class="tool-item" @click="action(item.action, item.args)" v-for="(item, index) in list" :key="index">
            <el-tooltip class="item" :content="item.name" placement="right">
                <el-button type="text">
                    <i class="icon iconfont" :class="{['icon-' + item.icon]: true}"></i>
                </el-button>
            </el-tooltip>
        </li>
        <!-- TODO: 撤销, 重做 -->
    </ul>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import * as utils from "@/utils";

export default {
    computed: {
        ...mapGetters(["currentPhone", "curItem"])
    },
    data() {
        return {
            list: [
                {
                    name: "复制",
                    action: "copy",
                    icon: "fuzhi"
                },
                {
                    name: "播放",
                    action: "run",
                    args: true,
                    icon: "bofang"
                },
                {
                    name: "置顶",
                    action: "updateZIndex",
                    args: "++",
                    icon: "zhiding"
                },
                {
                    name: "上移",
                    action: "updateZIndex",
                    args: "+",
                    icon: "shangyi"
                },
                {
                    name: "下移",
                    action: "updateZIndex",
                    args: "-",
                    icon: "xiayi"
                },
                {
                    name: "置底",
                    action: "updateZIndex",
                    args: "--",
                    icon: "12_zhidi"
                }
            ]
        };
    },
    methods: {
        ...mapActions(["copyPage", "updateItem"]),
        action(action, args) {
            switch (action) {
                case "copy":
                    this.copyPage();
                    break;
                case "run":
                    utils.runCurPhoneAni(args);
                    break;
                case "updateZIndex":
                    this.updateZIndex(args);
                    break;
            }
        },
        updateZIndex(type) {
            if (!this.curItem) return;
            const minZIndex = 1;
            const maxZIndex = this.currentPhone.data.length;
            const curZIndex = this.curItem.style["z-index"];

            if (
                (curZIndex == minZIndex && (type == "-" || type == "--")) ||
                (curZIndex == maxZIndex && (type == "+" || type == "++"))
            ) {
                return;
            }

            this.currentPhone.data.forEach(item => {
                let itemZIndex = item.style["z-index"];
                let index;
                if (type == "+" && itemZIndex == curZIndex + 1) {
                    index = curZIndex;
                } else if (type == "-" && itemZIndex == curZIndex - 1) {
                    index = curZIndex;
                } else if (type == "++" && itemZIndex >= curZIndex + 1) {
                    index = itemZIndex - 1;
                } else if (type == "--" && itemZIndex <= curZIndex + 1) {
                    index = itemZIndex + 1;
                }
                this.updateItem({
                    item: item,
                    key: "style",
                    val: {
                        "z-index": index
                    }
                });
            });

            let index;
            switch (type) {
                case "+":
                    index = curZIndex + 1;
                    break;
                case "-":
                    index = curZIndex - 1;
                    break;
                case "++":
                    index = maxZIndex;
                    break;
                case "--":
                    index = minZIndex;
                    break;
            }
            this.updateItem({
                key: "style",
                val: {
                    "z-index": index
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";

.tool-item {
    .el-tooltip {
        @include wh(40px, 40px);
    }
    &:hover {
        background: #2495fc;
        .el-tooltip {
            color: #fff;
        }
    }
}
.icon.disabled {
    color: #ccc;
}
.el-button {
    color: #999;
}
</style>
