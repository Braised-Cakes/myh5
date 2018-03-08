<template>
    <div>
        <el-form ref="form" label-width="60px">
            <el-form-item label="job_id">
                <el-input id="jobId" name="jobId" v-model="searchConf.jobId"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select id="jobStatus" v-model="searchConf.jobStatus">
                    <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in jobStatus"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="searchConf.startTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="--">
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="searchConf.endTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="pageinfo.page = 1, getList()" type="primary" element-loading-background="rgba(0, 0, 0, 0.8)" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="list-wrap">
            <el-table :data="tableList" stripe>
                <el-table-column align="center" :key="item.prop" v-for="(item, index) in listTableInfo" :show-overflow-tooltip="true" :prop="item.prop" :label="item.label">
                </el-table-column>
                <el-table-column width="100" fixed="right" label="操作">
                    <template slot-scope="scope">
                            <router-link class="td-pre link" :to="{name:'detail', params : { id : scope.row.jobId}}">
                                <el-button class="btn_to_link" type="text">查看详情</el-button>
                            </router-link>
</template>
                </el-table-column>

            </el-table>
            <el-pagination @current-change="getList" :current-page.sync="searchConf.page" :page-size="10" layout="prev, pager, next, jumper"
                :total="pageinfo.totalcount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import * as api from '@/api/index'
    import * as utils from '@/utils/index'
    export default {
        data() {
            return {
                searchConf: {
                    jobId: '',
                    jobStatus: 'all',
                    startTime: '',
                    endTime: '',
                    page: 1,
                    pagecount: 10,
                    resourceType: 'all',
                    productId: 'all'
                },
                fullscreenLoading: true,
                statusList: [],
                pageinfo: {
                    totalcount: 1
                },
                tableList: [],
                listTableInfo: [{
                    label: 'job_id',
                    prop: 'jobId'
                }, {
                    label: '产品线',
                    prop: 'productName'
                }, {
                    label: '资源类型',
                    prop: 'resourceType'
                }, {
                    label: '创建时间',
                    prop: 'createTime'
                }, {
                    label: '状态',
                    prop: 'statusName'
                }],
                jobStatus: [{
                        id: 'all',
                        name: '全部'
                    },
                    {
                        id: -1,
                        name: '未开始'
                    },
                    {
                        id: 30,
                        name: '调度中'
                    },
                    {
                        id: 1,
                        name: '创建中'
                    },
                    {
                        id: 10,
                        name: '创建成功'
                    },
                    {
                        id: 20,
                        name: '运行中'
                    },
                    {
                        id: 0,
                        name: '运行结束'
                    },
                    {
                        id: 4,
                        name: '用户停止'
                    },
                    {
                        id: 5,
                        name: '超时'
                    },
                    {
                        id: 7,
                        name: '失败'
                    },
                    {
                        id: 6,
                        name: '停止进行中'
                    },
                    {
                        id: 8,
                        name: '停止失败'
                    }
                ]
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.fullscreenLoading = true;
                api.getJobList(this.searchConf).then(res => {
                    res.result.listinfo.forEach((item, index) => {
                        item.statusName = utils.getName(item.status, this.jobStatus);
                    })
                    this.tableList = res.result.listinfo;
                    this.pageinfo.totalcount = res.result.pageinfo.totalcount;
                    this.fullscreenLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-form {
        display: flex;
        margin: 20px;
    }
    
    .el-pagination {
        margin: 20px 0;
        text-align: right;
    }
</style>
