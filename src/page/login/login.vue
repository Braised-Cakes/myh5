<style lang="scss" scoped>

</style>

<template>
  <div>
    <div>
      <el-input v-model="username" placeholder="账号"></el-input>
      <el-input v-model="password" placeholder="密码"></el-input>
      <el-button @click="login" type="primary">登录</el-button>
    </div>
    <div>
      <el-input v-model="username" placeholder="账号"></el-input>
      <el-input v-model="password" placeholder="密码"></el-input>
      <el-button @click="register" type="primary">注册</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    register() {
      api
        .userRegister({
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
        });
    },
    login() {
      console.log("点击了登录");
      api
        .userLogin({
          username: this.username,
          password: this.password
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
