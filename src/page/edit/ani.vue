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
            <li v-for="(item, index) in list">
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
                        <el-select size="mini" v-model="value7" placeholder="请选择">
                            <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </div>
                    <div class="style-item">
                        <label>动画时间</label>
                        <el-input-number size="mini" v-model="num1" :step="0.1" :min="0" :max="20"></el-input-number>
                    </div>
                    <div class="style-item">
                        <label>延迟时间</label>
                        <el-input-number size="mini" v-model="num2" :step="0.1" :min="0" :max="20"></el-input-number>
                    </div>
                    <div class="style-item">
                        <label>播放次数</label>
                        <el-input-number size="mini" v-model="num3" :step="1" :min="1" :max="10"></el-input-number>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [1],
                num1: 0,
                num2: 0,
                num3: 1,
                options3: [{
                    options: [{
                        value: 'none',
                        label: '无'
                    }]
                }, {
                    label: '进入',
                    options: [{
                        value: 'Shanghai',
                        label: '上海'
                    }]
                }, {
                    label: '退出',
                    options: [{
                        value: 'Chengdu',
                        label: '成都'
                    }]
                }],
                value7: ''
            }
        },
        methods: {
            addAni() {
                this.list.push(1)
            },
            delAni(index) {
                this.list.splice(index, 1)
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
