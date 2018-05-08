<template>
  <div class="header">
    <router-link to="home">
      <img class="logo" src="@/img/logo.png" />
    </router-link>
    <ul class="header-nav">
      <router-link class="nav-item" :key="item.id" v-for="item in list" tag="li" :to="'/' + item.id">{{item.name}}</router-link>
    </ul>
    <div class="user-help">
      <span>liushaopeng</span>
      <span>|</span>
      <a href="http://wiki.baidu.com/pages/viewpage.action?pageId=210683356">帮助</a>
      <a @click="logout">登出</a>
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
export default {
  methods: {
    logout() {
      api.userLogout().then((res) => {
        console.log(res)
        this.$router.push({
          name: "login"
        });
      });
    }
  },
  data() {
    return {
      list: [
        {
          name: "首页",
          id: "home"
        },
        {
          name: "资源管理",
          id: "resource"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 60px;
  background: #0c6922;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 30px;
    margin-left: 80px;
  }
  .header-nav {
    display: flex;
    justify-content: center;
    .nav-item {
      color: #fff;
      min-width: 90px;
      text-align: center;
      line-height: 60px;
      cursor: pointer;
    }
    .nav-item.active {
      background: #cad7e2;
      color: #4a7aa0;
    }
  }
  .user-help {
    display: flex;
    color: #fff;
    margin-right: 80px;
    * {
      margin: 0 5px;
    }
    a {
      color: #fff;
    }
  }
}
</style>
