<template>
    <section v-if="list.length != 0">
        <ul class="scene-list">
            <my-item :item="item" :index="index" :key="item.id" v-for="(item, index) in list"></my-item>
        </ul>
        <el-pagination 
            style="text-align:center;" 
            :current-page.sync="currentPage" 
            @current-change="get({page:$event})" 
            :page-size="limit" 
            background 
            layout="prev, pager, next" 
            :total="total">
        </el-pagination>
    </section>
    <section v-else class="no-list">
        <h2>暂无场景</h2>
        <a @click="createScene">创建场景</a>
        <img src="@/img/notfound.svg" />
    </section>
</template>

<script>
import Bus from "./bus.js";
import * as api from "@/api/index";
import myItem from "./item";
export default {
    components: {
        myItem
    },
    mounted() {
        Bus.$on("updateData", (payload = {}) => {
            if (payload.page) {
                this.currentPage = payload.page;
            }
            this.get(payload);
        });
        this.get();
    },
    methods: {
        createScene() {
            Bus.$emit("createScene");
        },
        get({ page = 1, status } = {}) {
            api
                .getSceneList({
                    limit: this.limit,
                    page: page,
                    status: status
                })
                .then(res => {
                    this.list = res.result.data;
                    this.total = res.result.info.total;
                })
                .catch(() => {});
        }
    },
    data() {
        return {
            list: [],
            currentPage: 1,
            total: 0,
            limit: 12
        };
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";

.scene-list {
    display: flex;
    flex-wrap: wrap;
}

.no-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    h2 {
        margin-bottom: 20px;
        color: #526069;
    }
    a {
        @include sc(14px, #59c7f9);
        display: block;
        margin-bottom: 20px;
    }
}
</style>
