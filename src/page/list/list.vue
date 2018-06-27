<template>
    <div class="list-page">
        <my-header></my-header>
        <my-create @close="createSceneVisible=false" :copy="false" v-if="createSceneVisible"></my-create>
        <section class="entrance">
            <div class="same-content">
                <el-button size="small" type="primary" @click="createSceneVisible = true" icon="el-icon-plus">创建场景</el-button>
            </div>
        </section>
        <my-feed @copy="createSceneVisible=true"></my-feed>
    </div>
</template>

<script>
import MyHeader from "./header.vue";
import MyCreate from "./create.vue";
import MyFeed from "./feed.vue";
export default {
    components: {
        MyHeader,
        MyCreate,
        MyFeed
    },
    data() {
        return {
            createSceneVisible: false
        };
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";
.list-page {
    min-height: 100vh;
    background: #f1f4f5;
    color: #526069;
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
}
</style>
