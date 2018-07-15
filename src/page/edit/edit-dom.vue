<template>
    <div v-if="hasSelectedOneItem && curItem.style">
        <ul @click="updateItem" class="nav">
            <li @click="navIndex = index" :class="{'active':index == navIndex}" :key="item" v-for="(item, index) in nav">
                {{item}}
            </li>
        </ul>
        <el-scrollbar v-if="navIndex == 0" style="height:calc(100vh - 60px - 60px - 50px);" class="page-component__nav">
            <div style="padding:12px 20px;">
                <el-input v-if="rules('content')" resize='none' @input="updateItem({key:'content', val: $event})" type="textarea" placeholder="请输入内容"
                    :rows="2" :value="curItem.content">
                </el-input>
                <div class="style-item" v-if="rules('line-height')">
                    <label>行高</label>
                    <el-input-number lazy :step="0.1" @change="updateItem({key:'style', val:{'line-height':$event}})" :value="curItem.style['line-height'] || 1.5"
                        :min="0" :max="3"></el-input-number>
                </div>
                <div class="style-item" v-if="rules('letter-spacing')">
                    <label>字距</label>
                    <el-input-number :step="1" @change="updateItem({key:'style', val:{'letter-spacing':($event / 100).toFixed(2) + 'em'}})" :value="Math.round(100 * parseFloat(curItem.style['letter-spacing'] || 0))"
                        :min="0" :max="100"></el-input-number>
                </div>
                <div class="style-item" v-if="rules('font-size')">
                    <label>字号</label>
                    <el-input-number :step="2" @change="updateItem({key:'style', val:{'font-size':$event + 'px'}})" :value="parseInt(curItem.style['font-size']) || 12"
                        :min="12" :max="96"></el-input-number>
                </div>
                <div class="style-item" v-if="rules('color')">
                    <label>文字颜色</label>
                    <el-color-picker size="medium" @active-change="updateItem({key:'style', val:{'color':$event}})" :value="curItem.style['color'] || '#666'"
                        show-alpha></el-color-picker>
                    <ul class="color-list">
                        <li @click="updateItem({key:'style', val:{'color':item}})" :style="{'background':item == 'rgba(0,0,0,0)' ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)' : item}"
                            :key="item" v-for="item in colorList"></li>
                    </ul>
                </div>
                <div class="style-item" v-if="rules('fill')" :key="key" v-for="(val, key, index) in curItem.fill">
                    <label>形状颜色{{index + 1}}</label>
                    <el-color-picker size="medium" @active-change="updateItem({key:'content', val:$event, fill : key});" :value="val || key"
                        show-alpha></el-color-picker>
                    <ul class="color-list">
                        <li @click="updateItem({key:'content', val:item, fill : key})" :style="{'background':item == 'rgba(0,0,0,0)' ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)' : item}"
                            :key="item" v-for="item in colorList"></li>
                    </ul>
                </div>
                <div class="style-item" v-if="rules('crop')">
                    <el-button @click="crop(false)">裁切图片1</el-button>
                    <el-button @click="crop(true)">裁切图片2</el-button>
                </div>
            </div>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="外观" name="1">
                    <div style="padding:12px 20px;">
                        <div class="style-item">
                            <label>背景颜色</label>
                            <el-color-picker size="medium" @active-change="updateItem({key:'style', val:{'background-color':$event}})" :value="curItem.style['background-color'] || 'rgba(0,0,0,0)'"
                                show-alpha></el-color-picker>
                            <ul class="color-list">
                                <li @click="updateItem({key:'style', val:{'background-color':item}})" :style="{'background':item == 'rgba(0,0,0,0)' ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)' : item}"
                                    :key="item" v-for="item in colorList"></li>
                            </ul>
                        </div>
                        <div class="style-item">
                            <label>透明度</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'opacity':($event / 100).toFixed(2)}})" :value="Math.round((curItem.style['opacity'] || 1) * 100)"
                                :min="0" :max="100"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>宽度</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'width': $event + 'px'}})" :value="parseInt(curItem.style['width'])"
                                :min="0"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>高度</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'height': $event + 'px'}})" :value="parseInt(curItem.style['height'])"
                                :min="0"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>x</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'left': $event + 'px'}})" :value="parseInt(curItem.style['left'])"
                                :min="0"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>y</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'top': $event + 'px'}})" :value="parseInt(curItem.style['top'])"
                                :min="0"></el-input-number>
                        </div>
                        <div ng-if="ability.advanceStyle.borderColor" class="tab-setting-line">
                            <div class="tab-setting-line-title">边框</div>
                        </div>
                        <div class="style-item">
                            <label>边框样式</label>
                            <el-select @change="updateItem({key:'style', val:{'border-style': $event}})" :value="curItem.style['border-style'] || 'solid'"
                                placeholder="请选择">
                                <el-option v-for="item in options222" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="style-item">
                            <label>边框颜色</label>
                            <el-color-picker size="medium" @active-change="updateItem({key:'style', val:{'border-color':$event}})" :value="curItem.style['border-color'] || '#000'"
                                show-alpha></el-color-picker>
                            <ul class="color-list">
                                <li @click="updateItem({key:'style', val:{'border-color':item}})" :style="{'background':item == 'rgba(0,0,0,0)' ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)' : item}"
                                    :key="item" v-for="item in colorList"></li>
                            </ul>
                        </div>
                        <div class="style-item">
                            <label>边框尺寸</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'border-width': $event + 'px'}})" :value="parseInt(curItem.style['border-width'] || 0)"
                                :min="0" :max="20"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>边框弧度</label>
                            <el-input-number :step="1" @change="updateItem({key:'style', val:{'border-radius': $event + '%'}})" :value="parseInt(curItem.style['border-radius'] || 0)"
                                :min="0" :max="50"></el-input-number>
                        </div>
                        <div ng-if="ability.advanceStyle.borderColor" class="tab-setting-line">
                            <div class="tab-setting-line-title">阴影</div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>
        <el-scrollbar v-if="navIndex == 1" style="height:calc(100vh - 60px - 60px - 50px);" class="page-component__nav">
            <v-ani></v-ani>
        </el-scrollbar>
        <el-scrollbar v-if="navIndex == 2" style="height:calc(100vh - 60px - 60px - 50px);" class="page-component__nav">
            <v-event></v-event>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ani from "./ani";
import vEvent from "./event";
let rules = {
    content: {
        default: false,
        but: ["txt"]
    },
    "line-height": {
        default: false,
        but: ["txt"]
    },
    "letter-spacing": {
        default: false,
        but: ["txt"]
    },
    "font-size": {
        default: false,
        but: ["txt"]
    },
    color: {
        default: false,
        but: ["txt"]
    },
    fill: {
        default: false,
        but: ["shape"]
    },
    crop: {
        default: false,
        but: ["image"]
    }
};
export default {
    components: {
        "v-ani": ani,
        "v-event": vEvent
    },
    computed: {
        ...mapGetters(["curItem", "hasSelectedOneItem"])
    },
    methods: {
        ...mapActions(["updateItem"]),
        rules(type) {
            if (rules[type].but.indexOf(this.curItem.type) != -1) {
                return !rules[type].default;
            } else {
                return rules[type].default;
            }
        },
        crop(type) {
            this.$crop({
                src: this.curItem.originPath,
                data: !type
                    ? {
                          type: "1:1",
                          width: 400,
                          height: 400
                      }
                    : this.curItem.crop,
                hasRight: type,
                callback: ({ src, data, action }) => {
                    if (action == "confirm") {
                        this.updateItem({
                            key: "path",
                            val: src
                        });
                        this.updateItem({
                            key: "content",
                            val: `<img style="width:100%;height:100%" src="${src}"/>`
                        });
                        this.updateItem({
                            key: "crop",
                            val: data
                        });
                    }
                }
            });
        }
    },
    data() {
        return {
            svgColorList: [],
            activeName: "1",
            nav: ["样式", "动画", "事件"],
            navIndex: 0,
            options: [
                {
                    label: "12px",
                    value: 12
                },
                {
                    label: "18px",
                    value: 18
                },
                {
                    label: "36px",
                    value: 36
                }
            ],
            value: 12,
            colorList: [
                "rgba(0,0,0,0)",
                "#fff",
                "rgba(255, 84, 72, 1)",
                "rgba(242, 166, 83, 1)",
                "rgba(24, 207, 161, 1)",
                "rgba(89, 199, 249, 1)",
                "rgba(77, 143, 243, 1)",
                "rgba(113, 113, 239, 1)",
                "rgba(79, 89, 117, 1)",
                "rgba(0, 0, 0, 1)"
            ],
            options222: [
                {
                    value: "none",
                    label: "--- 无 ---"
                },
                {
                    value: "solid",
                    label: "直线"
                },
                {
                    value: "dashed",
                    label: "破折线"
                },
                {
                    value: "dotted",
                    label: "点状线"
                },
                {
                    value: "double",
                    label: "双划线"
                }
            ],
            value222: "none"
        };
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";

.tab-setting-line {
    @include wh(220px, 1px);
    background: #ccd5db;
    @include fj(center);
    align-items: center;
    margin: 12px 0;
    .tab-setting-line-title {
        padding: 0 15px;
        color: #333;
        background-color: #fff;
    }
}

.color-list {
    width: 90px;
    display: flex;
    flex-wrap: wrap;
    li {
        @include wh(14px, 14px);
        padding: 1px;
        border: 1px solid #ccd5db;
        border-radius: 3px;
        margin: 2px;
        cursor: pointer;
    }
}

.style-item {
    padding: 8px 0;
    display: flex;
    @include fj;
}

.nav {
    display: flex;
    padding: 12px 20px;
    li {
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        flex: 1;
        cursor: pointer;
        border-bottom: 1px solid #ccd5db;
        &.active,
        &:hover {
            font-weight: 700;
            color: #1593ff;
            border-color: #1593ff;
        }
    }
}
</style>