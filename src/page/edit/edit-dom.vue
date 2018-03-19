<template>
    <div>
        <ul @click="updateItem" class="nav">
            <li @click="navIndex = index" :class="{'active':index == navIndex}" v-for="(item, index) in nav">
                {{item}}
            </li>
        </ul>
        <div style="padding:12px 20px;" v-if="currentItem.style">
            <el-input resize='none' @input="updateItem({key:'content', val: $event})" type="textarea" placeholder="请输入内容" :rows="2" :value="currentItem.content">
            </el-input>
            <div style="padding:8px 0;display:flex;align-items:center;justify-content:space-between;">
                <label>行高</label>
                <el-input-number lazy size="mini" :step="0.1" @change="updateItem({key:'style', val:{'line-height':$event}})" :value="currentItem.style['line-height'] || 1.5"
                    :min="0" :max="3"></el-input-number>
            </div>
            <div style="padding:8px 0;display:flex;align-items:center;justify-content:space-between;">
                <label>字距</label>
                <el-input-number size="mini" :step="1" @change="updateItem({key:'style', val:{'letter-spacing':($event / 100).toFixed(2) + 'em'}})"
                    :value="Math.round(100 * parseFloat(currentItem.style['letter-spacing'] || 0))" :min="0" :max="100"></el-input-number>
            </div>
            <div style="padding:8px 0;display:flex;align-items:center;justify-content:space-between;">
                <label>字号</label>
                <el-input-number size="mini" :step="2" @change="updateItem({key:'style', val:{'font-size':$event + 'px'}})" :value="parseInt(currentItem.style['font-size']) || 12"
                    :min="12" :max="96"></el-input-number>
            </div>
        </div>
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
                value: 12
            }
        }
    }

</script>
<style lang="scss" scoped>
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
