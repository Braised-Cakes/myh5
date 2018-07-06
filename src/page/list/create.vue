<template>
    <el-dialog width="500px"
        :visible.sync="visible"
        :title="copyId ? '复制场景' : '创建场景'">
        <el-form :model="ruleForm"
            ref="ruleForm"
            label-width="60px">
            <el-form-item prop="title"
                label="标题"
                :rules="{required: true, message: '场景标题不能为空'}">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item prop="desc"
                label="描述">
                <el-input type="textarea"
                    resize="none"
                    v-model="ruleForm.desc"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button @click="create"
                type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import * as api from "@/api/index";
import Bus from "./bus.js";

export default {
    created() {
        Bus.$on(
            "createScene",
            ({ title = "", desc = "", copyId = "" } = {}) => {
                this.visible = true;
                this.ruleForm.title = title;
                this.ruleForm.desc = desc;
                this.copyId = copyId;
            }
        );
    },
    data() {
        return {
            visible: false,
            ruleForm: {
                title: "",
                desc: ""
            },
            copyId: ""
        };
    },
    methods: {
        close() {
            this.visible = false;
        },
        create() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    await api.addScene({
                        title: this.ruleForm.title,
                        desc: this.ruleForm.desc,
                        id: this.copyId
                    });
                    this.$notify({
                        title: this.copyId ? "复制成功" : "创建成功",
                        type: "success"
                    });
                    Bus.$emit("updateData", {
                        page: 1
                    });
                    this.close();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
