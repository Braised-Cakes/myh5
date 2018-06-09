<style lang="scss" scoped>
@import "~@/css/mixin";
.particles-js {
    position: absolute;
    @include wh(100%, 100%);
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
                <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="60px">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="login" type="primary">登录</el-button>
            </div>
            <h3>注册</h3>
            <div>
                <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="60px">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="registerForm.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="registerForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="register" type="primary">注册</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import * as api from "@/api";
import $ from "jquery";
export default {
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            },
            registerForm: {
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
        //用户注册
        register() {
            this.$refs.registerForm.validate(async valid => {
                if (valid) {
                    const { message } = await api.userRegister({
                        username: this.registerForm.username,
                        password: this.registerForm.password
                    });
                    this.$alert(message, {
                        closeOnClickModal: true,
                        callback: () => {}
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //用户登录
        login() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    const { status, message = "" } = await api.userLogin({
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    });
                    if (status == 0) {
                        this.$router.push({
                            name: "list"
                        });
                    } else {
                        this.$alert(message, {
                            closeOnClickModal: true,
                            callback: () => {}
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
