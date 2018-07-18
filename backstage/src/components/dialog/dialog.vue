<template>
    <el-dialog :before-close="handleClose"
        width="470px"
        class="panel-dialog"
        :visible="visible"
        :show-close="false">
        <slot name="aaa"></slot>
    </el-dialog>
</template>

<script>
import * as types from "@/tpl/types";
export default {
    props: {
        title: {
            // required: true
        },
        visible: {
            required: true
        }
    },
    data() {
        return {
            types: types
        };
    },
    methods: {
        // ...mapMutations(["CLOSE_PANEL"]),
        handleClose(done) {
            console.log(9999);
            this.$emit("close");
            // this.CLOSE_PANEL(types.QRCODE)
            done();
        }
    }
};
</script>
<style lang="scss">
.panel-dialog {
    .el-dialog__header {
        padding: 0 !important;
    }
}
</style>

<style lang="scss" scoped>
@import "~@/css/variables.scss";
.header {
    padding: 15px 20px;
    border-bottom: 1px solid #ccd5db;
    min-height: 21px;
    background-color: #f7f7f7;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
        font-size: 18px;
        font-weight: bold;
        span {
            color: #a3afb7;
            font-size: 12px;
            padding-left: 10px;
        }
    }
    .close {
        display: block;
        width: 14px;
        height: 14px;
        color: #a3afb7;
        line-height: 14px;
        font-size: 21px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }
}
</style>
