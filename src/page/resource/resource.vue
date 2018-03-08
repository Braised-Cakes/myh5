<template>
    <el-container>
        <el-header>
            <v-header></v-header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!-- <div v-for="i in new Array(200)">{{aabbb}}</div> -->
                <v-sidebar :nav="nav"></v-sidebar>
            </el-aside>
            <el-container>
                <el-main>
                    <!-- <div v-for="i in new Array(2)">111</div> -->
                    <router-view></router-view>
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Header from '@/components/header/header.vue'
    import Sidebar from '@/components/sidebar/sidebar.vue'
    import $ from 'jquery'
    export default {
        components: {
            'vHeader': Header,
            'vSidebar': Sidebar
        },
        computed: {
            ...mapState([
                'aabbb'
            ]),
        },
        mounted() {
            $(window).resize(() => {
                // console.log($('body').width())

                console.log($('.el-form').css('width'));
            })
        },
        data() {
            return {
                nav: [{
                    name: '拓扑模版',
                    children: [{
                        name: '我的拓扑',
                        id: 'myTemplate',
                        icon: 'shouyi'
                    }, {
                        name: '工作台',
                        id: 'allTemplate',
                        icon: 'shenhe'
                    }]
                }]
            }
        }
    }

</script>

<style lang="scss" scoped>
    .el-header,
    .el-footer {
        background-color: #136826;
        color: #333;
        height: 60px;
    }

    .el-aside {
        height: calc(100vh - 60px);
        margin-right: 20px;
        border-right: 2px solid #e6e7e4;
    }

    .el-main {
        height: calc(100vh - 60px);
        min-width: calc(1300px - 200px);
        border-left: 2px solid #e6e7e4;
    }


    .el-container {
        overflow: auto;
    }

</style>
