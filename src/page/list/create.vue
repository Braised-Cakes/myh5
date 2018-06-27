<template>
    <el-dialog width="500px" @close="close" :visible="true" :title="copy ? '复制场景' : '创建场景'">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item prop="title" label="标题">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item prop="desc" label="描述">
                <el-input type="textarea" resize="none" v-model="ruleForm.desc"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button @click="create" type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import * as api from "@/api/index";
import Bus from "./bus.js";
export default {
    props: {
        copy: Boolean
    },
    data() {
        return {
            rules: {
                title: [
                    {
                        required: true,
                        message: "场景标题不能为空"
                    }
                ]
            },
            ruleForm: {
                title: "",
                desc: ""
            },
            copyId: ""
        };
    },
    created() {
        Bus.$on("copy", ({ title, desc, copyId }) => {
            this.ruleForm.title = title;
            this.ruleForm.desc = desc;
            this.copyId = copyId;
        });
    },
    methods: {
        close() {
            this.$emit("close");
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
                        title: this.copy ? "复制成功" : "创建成功",
                        type: "success"
                    });
                    Bus.$emit("updateData");
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
