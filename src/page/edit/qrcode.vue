<style lang="scss" scoped>
@import "~@/css/variables.scss";
.wrapper {
  width: 970px;
  background: #fff;
  border-radius: 6px;
  z-index: $panelZIndex;
  position: absolute;
  left: 100px;
  top: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
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
  .main {
    display: flex;
    height: calc(100% - 56px);
    .left {
      width: 160px;
      background: #f7f7f7;
      ul {
        li {
          height: 50px;
          line-height: 50px;
          color: #76838f;
          font-size: 14px;
          text-indent: 20px;
          cursor: pointer;
          &:hover {
            color: #1593ff;
          }
          &.active {
            background: #fff;
            border-top: 1px solid #ccd5db;
            border-bottom: 1px solid #ccd5db;
          }
          &:first-child {
            border-top: none;
          }
        }
      }
    }
    .right {
      // padding: 20px;
      // height: 480px;
      flex: 1;
      position: relative;
      .nav {
        border-bottom: 1px solid #ccc;
        margin: 0 20px;
        .nav-list {
          display: flex;
          li {
            line-height: 49px;
            margin-right: 30px;
            cursor: pointer;
            &.active {
              color: #1593ff;
            }
          }
        }
        .tag-list {
          display: flex;
          flex-wrap: wrap;
          li {
            line-height: 30px;
            margin-right: 15px;
            cursor: pointer;
            &.active {
              color: #1593ff;
            }
          }
        }
      }

      .right-content {
        position: relative;
        height: 480px;
        .img-list {
          margin-bottom: 20px;
          display: flex;
          padding: 20px;
          flex-wrap: wrap;
          li {
            width: 115px;
            height: 115px;
            margin-right: 15px;
            margin-bottom: 15px;
            background-color: #e6ebed;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: contain;
            cursor: pointer;
            &:nth-child(6n) {
              margin-right: 0;
            }
          }
        }
        .footer {
          position: absolute;
          bottom: 20px; // left: 0;
        }
      }
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="header">
      <h4>二维码</h4>
      <span @click="closePanel(types.QRCODE)" class="close">x</span>
    </div>
    <div class="main" style="height:500px;">
      <el-input v-model="url"></el-input>
      <el-button @click="create" size="mini" type="success">生成二维码</el-button>
      <el-button @click="confirm" size="mini" type="success">确定</el-button>
      <img :src="src" />
    </div>
  </div>
</template>
<script>
import * as api from "@/api";
import * as types from "@/tpl/types";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      types: types,
      url: "http://www.baidu.com",
      src:
        "http://p7m90pgef.bkt.clouddn.com/e81c1f5749545c5f7d247b3a100ffe62.svg"
    };
  },
  methods: {
    ...mapActions(["addItem", "openPanel", "closePanel"]),
    create() {
      api
        .createQRCode({
          url: encodeURIComponent(this.url)
        })
        .then(({ result }) => {
          this.src = result;
        });
    },
    confirm() {
      this.addItem({
        type: this.types.QRCODE,
        url: this.src
      });
      this.closePanel(types.QRCODE);
    }
  }
};
</script>