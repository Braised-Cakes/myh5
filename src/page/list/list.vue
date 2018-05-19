<template>
  <div class="container">
    <v-header></v-header>
    <div class="contain">
      <button @click="showCreateArea">新增一页</button>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" v-if="createArea" style="width:460px;padding:0 20px;position:absolute;background:#fff;border:1px solid #000;z-index:1293912;">
        <h3>{{isCopy ? '复制场景' : '创建场景'}}</h3>
        <el-form-item prop="title" label="名称">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述">
          <el-input v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <div>
          <el-button type="success" @click="create('ruleForm')">确定</el-button>
          <el-button @click="hideCreateArea">取消</el-button>
        </div>
      </el-form>
      <ul>
        <li ref="list" :key="item.id" v-for="(item, index) in list">
          <div class="image">
            <div class="front"></div>
            <div class="overlay">
              <!-- <a class="edit">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-logo"></use>
                  </svg>
                </div>
                <span>详情</span>
              </a> -->
              <router-link class="edit" :to="{ name: 'edit', params: { id: item.id }}">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-logo"></use>
                  </svg>
                </div>
                <span>编辑</span>
              </router-link>
            </div>
          </div>
          <div class="project-info">
            <p class="project-title">{{item.title}}</p>
            <a>
              <i class="icon iconfont icon-yulan"></i>
              <span>0</span>
            </a>
            <div class="button">
              <a @mouseenter="qrCodeEnter(index)" @mouseleave="qrCodeLeave(index)" class="erweima">
                <i class="icon iconfont icon-erweima"></i>
              </a>
              <div class="set">
                <a class="set-delete" @click="del(item)">
                  <i class="icon iconfont icon-erweima"></i>
                  <span>删除</span>
                </a>
                <a class="set-fabu" @click="copy(item)">
                  <i class="icon iconfont icon-erweima"></i>
                  <span>复制</span>
                </a>
                <!-- <a class="set-set">
                  <i class="icon iconfont icon-erweima"></i>
                  <span>设置</span>
                </a> -->
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
import * as api from "@/api/index";
import $ from "jquery";
import * as utils from "@/utils";
export default {
  components: {
    vHeader: Header
  },
  methods: {
    qrCodeEnter(index) {
      $(".front")
        .eq(index)
        .addClass("front2");
      $(".overlay")
        .eq(index)
        .hide();
    },
    qrCodeLeave(index) {
      $(".front")
        .eq(index)
        .removeClass("front2");
      $(".overlay")
        .eq(index)
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
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .addList({
              title: this.ruleForm.title,
              desc: this.ruleForm.desc,
              type: this.isCopy ? "copy" : "",
              id: this.copyId
            })
            .then(res => {
              console.log(res);
              this.hideCreateArea();
              this.get();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showCreateArea() {
      utils.openMask();
      this.createArea = true;
    },
    hideCreateArea() {
      this.ruleForm.title = "";
      this.ruleForm.desc = "";
      utils.removeMask();
      this.createArea = false;
      this.isCopy = false;
      this.copyId = null;
    },
    del(item) {
      api
        .delList({
          id: item.id
        })
        .then(res => {
          console.log(res);
          this.get();
        });
    },
    copy(item) {
      this.ruleForm.title = item.title;
      this.ruleForm.desc = item.desc;
      this.isCopy = true;
      this.copyId = item.id;
      this.showCreateArea();
    }
  },
  mounted() {
    this.get();
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      total: 0,
      createArea: false,
      isCopy: false,
      copyId: null,
      ruleForm: {
        title: "",
        desc: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "不能为空"
          }
        ]
      }
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
          // padding:5px;
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
