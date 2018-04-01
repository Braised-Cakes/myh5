<template>
    <div>
        <ul class="ani-topbar">
            <li @click="addAni">
                <i class="icon iconfont icon-tianjia"></i>
                <span>添加动画</span>
            </li>
            <li>
                <i class="icon iconfont icon-tianjia"></i>
                <span>预览动画</span>
            </li>
        </ul>
        <ul class="ani-list">
            {{curItem.style.animation}}
            <li v-for="(item, index) in curItem.animation">
                <div class="title">
                    <div class="left">
                        <span>动画{{index + 1}}</span>
                        <span class="ani-name">无</span>
                    </div>
                    <div class="right">
                        <span @click="delAni(index)" class="close">x</span>
                        <!-- <span class="close2">x</span> -->
                    </div>
                </div>
                <div style="padding:12px 20px;">
                    <div class="style-item">
                        <label>方式</label>
                        <el-select size="mini" @change="change('animation-name', index, $event)" :value="item['animation-name']" placeholder="请选择">
                            <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                    <div class="style-item">
                        <label>动画时间</label>
                        <el-input-number @change="change('animation-duration', index, $event + 's')" size="mini" :value="parseFloat(item['animation-duration'])"
                            :step="0.1" :min="1" :max="20"></el-input-number>
                    </div>
                    <div class="style-item">
                        <label>延迟时间</label>
                        <el-input-number @change="change('animation-delay', index, $event + 's')" size="mini" :value="parseFloat(item['animation-delay'])"
                            :step="0.1" :min="0" :max="20"></el-input-number>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                options3: [{
                    options: [{
                        value: 'none',
                        label: '无'
                    }]
                }, {
                    label: '进入',
                    options: [{
                        value: 'fadeIn',
                        label: '淡入'
                    }, {
                        value: 'fadeInLeft',
                        label: '移入'
                    }, {
                        value: 'opacityFadeInLeft',
                        label: '移入（透明度不变）'
                    }]
                }],
            }
        },
        computed: {
            ...mapGetters(['curItem']),
        },
        filters: {

        },
        methods: {
            ...mapActions(['updateItem']),
            addAni() {
                let ani = $.extend(true, [], this.curItem.animation);
                ani.push({
                    'animation-name': 'none',
                    'animation-duration': '1s',
                    'animation-delay': '0s',
                })
                this.updateItem({
                    key: 'animation',
                    val: ani
                })
            },
            delAni(index) {
                let ani = $.extend(true, [], this.curItem.animation);
                ani.splice(index, 1)
                this.updateItem({
                    key: 'animation',
                    val: ani
                })
            },
            change(type, index, val) {
                console.log(arguments)

                let ani = $.extend(true, [], this.curItem.animation);
                $('.phone-item').css({
                    'animation-duration': '3s'
                })
                // if(type == 'animation-delay')
                $('.phone-item').animateCss('bounce', function () {
                    $('.phone-item').css({
                        'animation-duration': '3s',
                        // 'animation-delay': '1s'
                    })
                    $('.phone-item').animateCss('fadeIn', function () {
                        // Do somthing after animation
                    });
                });
                ani[index][type] = val;
                this.updateItem({
                    key: 'animation',
                    val: ani
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
    .ani-topbar {
        display: flex;
        justify-content: space-around;
        margin: 5px 0 15px 0;
        i {
            margin-right: 6px;
        }
        li {
            cursor: pointer;
            &:hover {
                color: #2495fc;
            }
        }
    }

    .ani-list {
        li {
            .title {
                display: flex;
                background: #f6f9fa;
                height: 34px;
                line-height: 34px;
                margin-bottom: 7px;
                border-top: 1px solid #e6ebed;
                border-bottom: 1px solid #e6ebed;
                justify-content: space-between;
                padding: 0 20px;
                .right {
                    display: flex;
                    span {
                        font-size: 20px;
                    }
                    .close {
                        margin-right: 10px;
                    }
                }
                .ani-name {
                    background-color: rgba(89, 199, 249, .3);
                    border-radius: 10px;
                    max-width: 100px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    color: #526069;
                    margin: 7px 0;
                    padding: 0 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-left: 10px;
                }
            }
        }
    }


    .style-item {
        padding: 8px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

</style>
