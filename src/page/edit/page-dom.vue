<template>
    <section class="wrap-page">
        <div class="tab-setting-line">
            <div class="tab-setting-line-title">背景</div>
        </div>
        <div>
            <p>图片背景</p>
            <div class="bg-preview" @click="change">
                <img :src="currentPhone.main['background-image']" />
                <i class="icon iconfont icon-tianjia"></i>
            </div>
            <div class="bg-operation">
                <el-button @click="crop">裁切</el-button>
                <el-button @click="updateSomePageMain({key: 'background-image',val: ''})">删除</el-button>
                <el-button @click="change" type="primary">更换</el-button>
            </div>
        </div>
        <div class="style-item">
            <label>纯色背景</label>
            <el-color-picker @active-change="updateSomePageMain({key: 'background-color',val: $event}); updateSomePageMain({key: 'background-image',val: ''})" :value="currentPhone.main['background-color'] || '#fff'">
            </el-color-picker>
        </div>
        <div class="style-item">
            <label>透明度</label>
            <el-input-number :min="0" :max="100" :step="1" @change="updateSomePageMain({key: 'opacity', val: ($event / 100).toFixed(2)})" :value="Math.round((currentPhone.main['opacity'] || 1) * 100)">
            </el-input-number>
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["currentPhone"])
    },
    methods: {
        ...mapActions(["updateSomePageMain", "cropBgImage"]),
        crop() {
            this.cropBgImage({
                path: this.currentPhone.main["background-image"],
                data: this.currentPhone.main["background-crop"]
            });
        },
        change() {
            this.$image({
                callback: ({ path }) => {
                    let img = new Image();
                    img.src = path;
                    img.onload = () => {
                        this.cropBgImage({ path });
                    };
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";

.wrap-page {
    padding: 12px 20px;
    .style-item {
        padding: 8px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
.tab-setting-line {
    @include wh(220px, 1px);
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
.bg-preview {
    @include wh(220px, 180px);
    line-height: 180px;
    border: 1px dashed #ccc;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin: 10px 0;
    background: #fff;
    img {
        display: block;
        @include wh(auto, 100%);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}

.bg-operation {
    @include fj;
}
</style>
