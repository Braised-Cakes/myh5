<style lang="scss" scoped>
@import "~@/css/mixin";
.particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #1bbbc6;
    background-image: url("");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
}
.container {
    @include ctl;
    @include wh(400px, 500px);
    padding: 20px;
    background: #fff;
    border-radius: 5px;
    h3 {
        font-size: 16px;
    }
}
</style>

<template>
    <div class="login-page">
        <div class="particles-js" id="particles-js"></div>
        <div class="container">
            <h3>登录</h3>
            <div>
                <el-form :model="ruleForm" :rules="rules" label-width="60px">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="login" type="primary">登录</el-button>
            </div>
            <!-- <div>
                <el-input v-model="username" placeholder="账号"></el-input>
                <el-input v-model="password" placeholder="密码"></el-input>
                <el-button @click="register" type="primary">注册</el-button>
            </div> -->
        </div>
    </div>
</template>
<script>
import * as api from "@/api";
export default {
    data() {
        return {
            ruleForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "账号不能为空"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空"
                    }
                ]
            }
        };
    },
    mounted() {
        // particlesJS("particles-js", {
        //     particles: {
        //         number: {
        //             value: 200
        //         },
        //         size: {
        //             value: 1
        //         },
        //         events: {
        //             onclick: {
        //                 enable: false
        //             }
        //         }
        //     }
        // });
    },
    methods: {
        register() {
            api
                .userRegister({
                    username: this.ruleForm.username,
                    password: this.ruleForm.password
                })
                .then(res => {
                    console.log(res);
                });
        },
        login() {
            console.log("点击了登录");
            api
                .userLogin({
                    username: this.ruleForm.username,
                    password: this.ruleForm.password
                })
                .then(res => {
                    console.log(res);
                    if (res.status == 0) {
                        this.$router.push({
                            name: "list"
                        });
                    }
                });
        }
    }
};
</script>
