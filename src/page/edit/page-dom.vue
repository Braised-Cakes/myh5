<template>
    <section class="wrap-page">
        <div ng-if="ability.advanceStyle.borderColor" class="tab-setting-line">
            <div class="tab-setting-line-title">背景</div>
        </div>
        <div>
            <p style="line-height:26px;">图片背景</p>
            <div class="bg-preview">
                <img :src="currentPhone.main['background-image']" />
                <i class="icon iconfont icon-tianjia"></i>
            </div>
            <ul class="cut" style="display:flex;justify-content:space-between;">
                <li>
                    <el-button size="mini" @click="crop">裁切</el-button>
                </li>
                <li>
                    <el-button size="mini" @click="updateSomePageMain({key: 'background-image',val: ''})">删除</el-button>
                </li>
                <li>
                    <el-button size="mini" @click="change" type="primary">更换</el-button>
                </li>
            </ul>
        </div>
        <div class="style-item">
            <label>纯色背景</label>
            <el-color-picker @active-change="updateSomePageMain({key: 'background-color',val: $event}); updateSomePageMain({key: 'background-image',val: ''})" :value="currentPhone.main['background-color'] || '#fff'" show-alpha></el-color-picker>
        </div>
        <div class="style-item">
            <label>透明度</label>
            <el-input-number size="mini" :step="1" @change="updateSomePageMain({key: 'opacity', val: ($event / 100).toFixed(2)})" :value="Math.round((currentPhone.main['opacity'] || 1) * 100)" :min="0" :max="100"></el-input-number>
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
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    img {
        display: block;
        height: 100%;
        width: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}

.cut {
    li {
        a {
            border: 1px solid #1593ff;
            color: #1593ff;
            background-color: #fff;
            border-radius: 3px;
            height: 30px;
            line-height: 30px;
            padding: 0;
            width: 60px;
            text-align: center;
            margin: 0 auto;
            display: block;
        }
    }
}
</style>
