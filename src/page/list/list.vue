<template>
  <div class="container">
    <v-header></v-header>
    <div class="contain">
      <button @click="add">新增一页</button>
      <ul>
        <li ref="list" :key="item.id" v-for="(item, index) in list">
          <div class="image">
            <div class="front"></div>
            <div class="overlay">
              <router-link class="edit" :to="{ name: 'edit', params: { id: item.id }}">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-logo"></use>
                  </svg>
                </div>
                <span>编辑</span>
              </router-link>
              <a class="edit" @click="del(item)">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-logo"></use>
                  </svg>
                </div>
                <span>删除</span>
              </a>
            </div>
          </div>
          <div class="project-info">
            <p class="project-title">未命名场景</p>
            <a>
              <i class="icon iconfont icon-yulan"></i>
              <span>0</span>
            </a>
            <div class="button">
              <a @mouseover="fff(index)" @mouseout="ffff(index)" class="erweima">
                <i class="icon iconfont icon-erweima"></i>
              </a>
              <div class="set">
                <a class="set-delete">
                  <i class="icon iconfont icon-erweima"></i>
                  <span>删除</span>
                </a>
                <a class="set-fabu">
                  <i class="icon iconfont icon-erweima"></i>
                  <span>发布</span>
                </a>
                <a class="set-set">
                  <i class="icon iconfont icon-erweima"></i>
                  <span>设置</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <el-pagination @current-change="get" :page-size="12" background layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
// import Sidebar from '@/components/sidebar/sidebar.vue'
import * as api from "@/api/index";
import $ from "jquery";
export default {
  components: {
    vHeader: Header
    // 'vSidebar': Sidebar
  },
  computed: {},
  methods: {
    fff(i) {
      $(".front")
        .eq(i)
        .addClass("front2");
      $(".overlay")
        .eq(i)
        .hide();
    },
    ffff(i) {
      $(".front")
        .eq(i)
        .removeClass("front2");
      $(".overlay")
        .eq(i)
        .show();
    },
    get(page) {
      api
        .getJobList({
          limit: 12,
          page: page || 1
        })
        .then(res => {
          console.log(res);
          this.list = res.result.data;
          this.total = res.result.info.total;
        })
        .catch(res => {
          console.log(res);
        });
    },
    add() {
      api.addList({}).then(res => {
        console.log(res);
      });
    },
    del(item) {
      api
        .delList({
          id: item.id
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    this.get();
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      total: 0
    };
  }
};
</script>
<style lang="scss" scoped>
@-webkit-keyframes zoomIn {
  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
.container {
  min-height: 100vh;
  background: #f1f4f5;
}
.contain {
  width: 1180px;
  position: relative;
  margin: 0 auto; // display: flex;
  // justify-content: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  li {
    position: relative;
    font-size: 12px;
    background-color: #fff;
    border-radius: 3px;
    width: 280px;
    height: 360px;
    overflow: hidden;
    margin-right: 20px;
    margin-bottom: 20px;

    .image {
      width: 280px;
      height: 260px;
      overflow: hidden;
      transition: 0.2s;
      .front {
        height: 280px;
        background: url(~@/img/logo2.png) no-repeat;
        background-size: 100%;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      .front2 {
        background: url(http://p7m90pgef.bkt.clouddn.com/e81c1f5749545c5f7d247b3a100ffe62.svg)
          center 0px no-repeat;
        background-size: 240px;
        -webkit-animation: zoomIn 0.5s ease-in-out 0s 1 both;
      }
      .overlay {
        display: none;
        height: 280px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        width: 100%;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        text-align: center;
        z-index: 1;
        top: 0;
        color: #fff;
        transform: translateY(-20px);
        .edit {
          display: inline-block;
          margin-top: 93px;
          padding: 0 10px;
          cursor: pointer;
          color: #fff;
          opacity: 1;
          position: relative;
          div {
            font-size: 20px;
            display: block;
            border-radius: 50%;
            background-color: hsla(0, 0%, 100%, 0.2);
            text-align: center;
            width: 50px;
            height: 50px;
            line-height: 50px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .project-info {
      background-color: #fff;
      position: absolute;
      height: 100px;
      width: 100%;
      text-align: center;
      z-index: 1;
      padding: 20px;
      transition: transform 0.2s ease;
      .project-title {
        font-size: 14px;
        line-height: 30px;
      }
      .button {
        display: flex;
        position: absolute;
        width: 100%;
        left: 0;
        padding: 0 10px;
        bottom: -35px;
        justify-content: space-between;
        .erweima {
          background: #f0f3f4;
          border: 5px solid #f0f3f4;
          border-radius: 3px;
          width: 30px;
          height: 30px;
          cursor: pointer;
          &:hover {
            background: #5ec8f7;
            border: 5px solid #5ec8f7;
            color: #fff;
          }
        }
        .set {
          a {
            font-size: 12px;
            width: 30px;
            height: 30px;
            display: inline-block;
            overflow: hidden;
            cursor: pointer;
            transition: 0.3s;
            margin-left: 3px;
            border: 1px solid #ccd5db;
            border-radius: 3px;
            text-align: left;
            background: #fff;
            i {
              padding: 0 10px 0 8px;
              line-height: 28px;
            }
            span {
              margin-right: 10px;
              color: #fff;
            }
            &:hover {
              width: 70px;
              i {
                color: #fff;
              }
            }
            &.set-delete:hover {
              background-color: #fd7f80;
              border-color: #fd7f80;
            }
            &.set-fabu:hover {
              background-color: #4fd4b2;
              border-color: #4fd4b2;
            }
            &.set-set:hover {
              background-color: #5ec8f7;
              border-color: #5ec8f7;
            }
          }
        }
      }
    }
    &:hover {
      .overlay {
        display: block;
      }
      .image {
        height: 220px;
      }
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>
