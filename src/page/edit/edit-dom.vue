<template>
    <div>
        <ul @click="updateItem" class="nav">
            <li @click="navIndex = index" :class="{'active':index == navIndex}" v-for="(item, index) in nav">
                {{item}}
            </li>
        </ul>
        <div style="padding:12px 20px;">
            <el-input resize='none' @input="updateItem({key:'content', val: $event})" type="textarea" placeholder="请输入内容" :rows="2"
                :value="currentItem.content">
            </el-input>
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
                navIndex: 0
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
