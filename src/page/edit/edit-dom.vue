<template>
    <div v-if="currentItem.style">

        <ul @click="updateItem" class="nav">
            <li @click="navIndex = index" :class="{'active':index == navIndex}" v-for="(item, index) in nav">
                {{item}}
            </li>
        </ul>
        <el-scrollbar style="height:calc(100vh - 60px - 60px - 50px);" class="page-component__nav">
            <div style="padding:12px 20px;">
                <el-input resize='none' @input="updateItem({key:'content', val: $event})" type="textarea" placeholder="请输入内容" :rows="2" :value="currentItem.content">
                </el-input>
                <div class="style-item">
                    <label>行高</label>
                    <el-input-number lazy size="mini" :step="0.1" @change="updateItem({key:'style', val:{'line-height':$event}})" :value="currentItem.style['line-height'] || 1.5"
                        :min="0" :max="3"></el-input-number>
                </div>
                <div class="style-item">
                    <label>字距</label>
                    <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'letter-spacing':($event / 100).toFixed(2) + 'em'}})"
                        :value="Math.round(100 * parseFloat(currentItem.style['letter-spacing'] || 0))" :min="0" :max="100"></el-input-number>
                </div>
                <div class="style-item">
                    <label>字号</label>
                    <el-input-number size="mini" :step="2" @change="updateItem({key:'style', val:{'font-size':$event + 'px'}})" :value="parseInt(currentItem.style['font-size']) || 12"
                        :min="12" :max="96"></el-input-number>
                </div>
                <div class="style-item">
                    <label>文字颜色</label>
                    <el-color-picker @active-change="updateItem({key:'style', val:{'color':$event}})" :value="currentItem.style['color'] || '#666'"
                        show-alpha></el-color-picker>
                    <ul class="color-list">
                        <li @click="updateItem({key:'style', val:{'color':item}})" :style="{'background-color':item}" v-for="item in colorList"></li>
                    </ul>
                </div>
            </div>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="外观" name="1">
                    <div style="padding:12px 20px;">
                        <div class="style-item">
                            <label>背景颜色</label>
                            <el-color-picker @active-change="updateItem({key:'style', val:{'background-color':$event}})" :value="currentItem.style['background-color']"
                                show-alpha></el-color-picker>
                            <ul class="color-list">
                                <li @click="updateItem({key:'style', val:{'background-color':item}})" :style="{'background-color':item}" v-for="item in colorList"></li>
                            </ul>
                        </div>
                        <div class="style-item">
                            <label>透明度</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'opacity':($event / 100).toFixed(2)}})" :value="Math.round((currentItem.style['opacity'] || 1) * 100)"
                                :min="0" :max="100"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>宽度</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'width': $event + 'px'}})" :value="parseInt(currentItem.style['width'])"
                                :min="0"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>高度</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'height': $event + 'px'}})" :value="parseInt(currentItem.style['height'])"
                                :min="0"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>x</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'left': $event + 'px'}})" :value="parseInt(currentItem.style['left'])"
                                :min="0"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>y</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'top': $event + 'px'}})" :value="parseInt(currentItem.style['top'])"
                                :min="0"></el-input-number>
                        </div>
                        <div ng-if="ability.advanceStyle.borderColor" class="tab-setting-line">
                            <div class="tab-setting-line-title">边框</div>
                        </div>
                        <div class="style-item">
                            <label>边框颜色</label>
                            <el-color-picker @active-change="updateItem({key:'style', val:{'border-color':$event}})" :value="currentItem.style['border-color'] || '#000'"
                                show-alpha></el-color-picker>
                            <ul class="color-list">
                                <li @click="updateItem({key:'style', val:{'border-color':item}})" :style="{'background-color':item}" v-for="item in colorList"></li>
                            </ul>
                        </div>
                        <div class="style-item">
                            <label>边框尺寸</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'border-width': $event + 'px'}})" :value="parseInt(currentItem.style['border-width'] || 0)"
                                :min="0" :max="20"></el-input-number>
                        </div>
                        <div class="style-item">
                            <label>边框弧度</label>
                            <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'border-radius': $event + '%'}})" :value="parseInt(currentItem.style['border-radius'] || 0)"
                                :min="0" :max="50"></el-input-number>
                        </div>
                        <div ng-if="ability.advanceStyle.borderColor" class="tab-setting-line">
                            <div class="tab-setting-line-title">阴影</div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="通用" name="2">
                    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from 'vuex'
    import $ from 'jquery'
    export default {
        components: {},
        computed: {
            ...mapGetters(['currentItem'])
        },
        methods: {
            ...mapActions(['updateItem'])
        },
        mounted() {},
        data() {
            return {
                activeName: '1',
                nav: ['样式', '动画'],
                navIndex: 0,
                options: [{
                    label: '12px',
                    value: 12
                }, {
                    label: '18px',
                    value: 18
                }, {
                    label: '36px',
                    value: 36
                }],
                value: 12,
                color3: 'rgba(19, 206, 102, 0.8)',
                colorList: ['#fff', 'rgb(255, 84, 72)', 'rgb(242, 166, 83)', 'rgb(255, 202, 40)', 'rgb(24, 207, 161)',
                    'rgb(89, 199, 249)', 'rgb(77, 143, 243)', 'rgb(113, 113, 239)', 'rgb(79, 89, 117)',
                    'rgb(0, 0, 0)'
                ]
            }
        }
    }

</script>
<style lang="scss" scoped>
    .tab-setting-line {
        width: 220px;
        height: 1px;
        background: #ccd5db;
        display: flex;
        justify-content: center;
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
            width: 14px;
            height: 14px;
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
        align-items: center;
        justify-content: space-between;
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
