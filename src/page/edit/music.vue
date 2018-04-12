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
      position: relative;
      border-bottom-left-radius: 3px;
      overflow: hidden;
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
      .operation {
        position: absolute;
        bottom: 0;
        width: 100%;
        .item {
          height: 50px;
          line-height: 50px;
          display: flex;
          font-size: 14px;
          justify-content: center;
          cursor: pointer;
          &:nth-child(1) {
            border-top: 1px solid #e6ebed;
            border-bottom: 1px solid #e6ebed;
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
            &.active {
              color: #1593ff;
            }
          }
        }
      }

      .right-content {
        position: relative;
        height: 420px;
        margin: 0 20px;
        .img-list {
          // margin-bottom: 20px;
          // display: flex;
          padding: 20px 0;
          flex-wrap: wrap;
          li {
            // width: 115px;
            height: 30px;
            line-height: 30px;
            // text-indent: 10px;
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            // margin-right: 15px;
            // margin-bottom: 15px;
            background: #e6ebed;
            // background-repeat: no-repeat;
            // background-position: center center;
            // background-size: contain;
            cursor: pointer;
            .icon {
              font-size: 12px;
              color: #ccc;
            }
            &:nth-child(6n) {
              // margin-right: 0;
            }
            &:nth-child(2n) {
              background: #fff;
            }
            &:hover,
            &.active {
              background: #2495fc;
              color: #fff;
              .icon {
                color: #fff;
              }
            }
          }
        }
        .footer {
          position: absolute;
          width: 100%;
          bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="header">
      <h4>音乐库
        <!-- <span>{{phoneData.main}}</span> -->
      </h4>
      <span @click="closePanel(types.MUSIC)" class="close">x</span>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li class="active">音乐库</li>
          <li>我的上传</li>
        </ul>
        <div class="operation">
          <div class="item">
            <span>上传</span>
          </div>
          <div class="item">
            <span>添加外链</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="nav">
          <ul class="nav-list">
            <li class="active">全部</li>
            <li>全部</li>
            <li>全部</li>
          </ul>
        </div>
        <div class="right-content">
          <ul class="img-list">
            <li @click="choiceMusic(item)" :class="{'active':item.id == curMusic.id}" :key="item.id" v-for="item in list">
              <p>{{item.path}}.mp3</p>
              <div class="button">
                <i class="icon iconfont icon-bofang"></i>
              </div>
            </li>
          </ul>
          <div v-if="curMusic">
            <p>已选择:{{curMusic.path}}</p>
          </div>
          <div class="footer">
            <el-pagination background @current-change="get" :page-size="pageInfo.pageSize" layout="prev, pager, next" :total="pageInfo.total"></el-pagination>
            <div>
              <el-button @click="confirm" size="mini" type="success">确定</el-button>
              <el-button @click="closePanel(types.MUSIC)" size="mini" type="success">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import * as api from "@/api";
import * as types from "@/tpl/types";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "music",
  data() {
    return {
      types: types,
      list: [],
      nowItem: {},
      pageInfo: {
        pageSize: 10,
        total: 0
      },
      navOption: [
        {
          label: "全部",
          key: ""
        },
        {
          label: "图形",
          key: ""
        },
        {
          label: "文字",
          key: ""
        },
        {
          label: "图标",
          key: ""
          // children
        }
      ]
    };
  },
  computed: {
    ...mapState({
      panel: state => state.edit.panel
    }),
    ...mapGetters(["phoneData"]),
    curMusic() {
      let music = this.nowItem;
      if ($.isEmptyObject(music)) {
        music = this.phoneData.main.music || {};
      }
      return music;
    }
  },
  methods: {
    ...mapActions(["addItem", "openPanel", "closePanel", "updateMain"]),
    choiceMusic(item) {
      this.nowItem = item;
    },
    confirm() {
      this.updateMain({
        key: "music",
        val: this.curMusic
      });
      this.closePanel(types.MUSIC);
    },
    get(page) {
      api
        .getShape({
          limit: this.pageInfo.pageSize,
          page: page || 1
        })
        .then(res => {
          this.list = res.result.data;
          this.pageInfo.total = res.result.info.total;
        });
    }
  },
  mounted() {
    this.get();
  }
};
</script>