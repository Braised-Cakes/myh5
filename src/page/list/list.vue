<template>
    <div class="list-page">
        <my-header class="my-header"></my-header>
        <my-create></my-create>
        <section class="entrance">
            <div class="same-content">
                <el-button size="small"
                    type="primary"
                    @click="createScene"
                    icon="el-icon-plus">创建场景</el-button>
                <el-button size="small"
                    type="primary"
                    @click="goTrash"
                    v-if="trash">我的场景</el-button>
                <el-button size="small"
                    type="danger"
                    @click="goTrash"
                    v-else
                    icon="el-icon-delete">回收站</el-button>
            </div>
        </section>
        <my-feed class="my-feed"></my-feed>
    </div>
</template>

<script>
import Bus from "./bus.js";
import MyHeader from "./header.vue";
import MyCreate from "./create.vue";
import MyFeed from "./feed.vue";

export default {
    components: {
        MyHeader,
        MyCreate,
        MyFeed
    },
    methods: {
        createScene() {
            Bus.$emit("createScene");
        },
        goTrash() {
            this.trash = this.trash ? false : true;
            Bus.$emit("updateData", {
                status: this.trash ? 3 : "",
                page: 1
            });
        }
    },
    data() {
        return {
            trash: false
        };
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";

.list-page {
    min-height: 100vh;
    background: #f1f4f5;
    .entrance {
        background: #fff;
        border-bottom: 1px solid #e6ebed;
        margin-bottom: 20px;
        .same-content {
            @include wh(1180px, 60px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .my-feed {
        width: 1180px;
        position: relative;
        margin: 0 auto;
        padding-bottom: 20px;
    }
}
</style>
