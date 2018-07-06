<template>
    <div style="height:100%;width:100%;position:absolute;">
        <my-header></my-header>
        <div id="svg_cache"
            style="width:0px;height:0px;overflow:hidden;"></div>
        <el-scrollbar class="page-component__nav"
            style="height:100%;">
            <div class="main">
                <my-page :data="panel"></my-page>
                <!-- <my-qrcode v-if="modulePanel[types.QRCODE]"></my-qrcode> -->
                <my-phone></my-phone>
                <my-tool class="my-tool"></my-tool>
            </div>
            <my-set v-if="modulePanel['SET']"
                class="set-area"></my-set>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import myQrcode from "./qrcode";
import mySet from "./set";
import myHeader from "./header";
import myTool from "./tool";
import myPage from "./page";
import myPhone from "./phone";

export default {
    components: {
        "my-header": myHeader,
        "my-page": myPage,
        "my-qrcode": myQrcode,
        "my-set": mySet,
        "my-tool": myTool,
        "my-phone": myPhone
    },
    computed: {
        ...mapState({
            modulePanel: state => state.edit.panel
        })
    },
    methods: {
        ...mapActions(["setPhone"])
    },
    created() {
        this.setPhone({
            id: this.$route.params.id
        });
    },
    data() {
        return {
            panel: {
                fillColorList: []
            }
        };
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";
@import "~@/css/variables.scss";

.my-tool {
    width: 40px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.16);
    background: #fff;
    position: absolute;
    z-index: $helpZIndex;
    left: 770px;
    top: 200px;
}
.main,
.set-area {
    background-color: #eee;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin-top: 56px;
    min-width: 1180px;
}
</style>