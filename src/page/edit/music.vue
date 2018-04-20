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
          flex-wrap: wrap;
          padding-top: 15px;
          padding-bottom: 5px;
          li {
            line-height: 30px;
            margin-right: 30px;
            cursor: pointer;
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
          padding: 15px 0;
          flex-wrap: wrap;
          height: 340px;
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
        .no-list {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          img {
            margin-top: 70px;
          }
          p {
            margin-top: 30px;
          }
        }
        .footer {
          position: absolute;
          width: 100%;
          bottom: 10px;
          // display: flex;
          // justify-content: space-between;
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
      <span @click="close" class="close">x</span>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li @click="changeLeftIndex(0);" :class="{active : leftIndex == 0}">音乐库</li>
          <li @click="changeLeftIndex(1);" :class="{active : leftIndex == 1}">我的上传</li>
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
      <div class="right" v-loading="loading1">
        <div class="nav" v-if="leftIndex == 0 && navOption.length != 0">
          <ul class="nav-list">
            <li :key="item.typeId" @click="changeNav(index);" :class="{ active : navIndex == index}" v-for="(item, index) in navOption">{{ item.name }}</li>
          </ul>
        </div>
        <div class="right-content">
          <ul v-if="list.length > 0" class="img-list">
            <li @click="choiceMusic(item)" :class="{'active':item.id == curMusic.id}" :key="item.id" v-for="item in list">
              <p>{{item.name}}</p>
              <div @click="play(item)" class="button">
                <i v-if="playMusicId != item.id" class="icon iconfont icon-bofang"></i>
                <i v-if="playMusicId == item.id" class="icon iconfont icon-zanting"></i>
              </div>
            </li>
          </ul>
          <div class="no-list" v-if="list.length == 0">
            <img src="@/img/image_default.svg" />
            <p class="empty-guide">赶紧去制作场景吧～</p>
          </div>
          <div v-if="curMusic.id">
            <span>已选择:{{curMusic.name}}</span>
            <span @click="cancelChoiceMusic" style="margin-left:15px;cursor:pointer;">
              <i class="icon iconfont icon-qingchu"></i>
            </span>
          </div>
          <div class="footer">
            <el-pagination style="float:left;" v-show="pageInfo.total != 0" :current-page.sync="pageInfo.currentPage" background @current-change="get" :page-size="pageInfo.pageSize" layout="prev, pager, next" :total="pageInfo.total"></el-pagination>
            <div style="float:right;">
              <el-button @click="close" size="mini">取消</el-button>
              <el-button @click="confirm" size="mini" type="success">确定</el-button>
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
      curMusic: {},
      playMusicId: null,
      pageInfo: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      navOption: [],
      navIndex: 0,
      audio: null,
      leftIndex: 0,
      loading1: true,
      loading2: false
    };
  },
  computed: {
    ...mapState({
      panel: state => state.edit.panel
    }),
    ...mapGetters(["phoneData"])
  },
  methods: {
    ...mapActions(["addItem", "openPanel", "closePanel", "updateMain"]),
    /**
     * 关闭音乐面板
     */
    close() {
      this.pause();
      this.closePanel(types.MUSIC);
    },
    changeLeftIndex(index) {
      this.leftIndex = index;
      this.pageInfo.currentPage = 1;
      this.get();
    },
    changeNav(index) {
      this.navIndex = index;
      this.pageInfo.currentPage = 1;
      this.get();
    },
    /**
     * 选择音乐
     */
    choiceMusic(item) {
      this.curMusic = item;
    },
    /**
     * 取消选择音乐
     */
    cancelChoiceMusic() {
      this.curMusic = {};
    },
    /**
     * 确认
     */
    async confirm() {
      await api.choiceMusic({
        id: this.curMusic.id
      });
      this.updateMain({
        key: "music",
        val: this.curMusic
      });
      this.close();
    },
    get() {
      this.loading1 = true;
      api
        .getMusic({
          limit: this.pageInfo.pageSize,
          page: this.pageInfo.currentPage,
          typeId: this.navOption[this.navIndex].typeId,
          used: this.leftIndex == 0 ? "" : 1
        })
        .then(res => {
          this.list = res.result.data;
          this.pageInfo.total = res.result.info.total;
          this.loading1 = false;
        });
    },
    /**
     * 暂停音乐
     */
    pause() {
      this.audio && this.audio.pause();
      this.playMusicId = null;
    },
    /**
     * 播放音乐
     */
    play(item) {
      if (this.audio) {
        this.audio.pause();
      } else {
        this.audio = document.createElement("audio");
      }
      if (item.id == this.playMusicId) {
        this.playMusicId = null;
        return;
      }
      this.audio.src = `http://p7dremn1s.bkt.clouddn.com/${item.path}`;
      this.audio.play();
      this.playMusicId = item.id;
      this.audio.onended = function() {
        this.playMusicId = null;
      };
    }
  },
  async mounted() {
    let { result = [] } = await api.getMusicNav();
    this.navOption = result;
    this.get();
    this.curMusic = $.extend(true, {}, this.phoneData.main.music || {});
  }
};
</script>