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
        height: 460px;
        margin: 0 20px;
        .img-list {
          padding: 15px 0;
          display: flex;
          flex-wrap: wrap;
          height: 340px;
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
            .icon {
              font-size: 12px;
              color: #ccc;
            }
            &:nth-child(6n) {
              margin-right: 0;
            }
            // &:hover,
            // &.active {
            //   background: #2495fc;
            //   color: #fff;
            //   .icon {
            //     color: #fff;
            //   }
            // }
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

.progress-area {
  position: absolute;
  left: 0;
  width: 0%;
  height: 100%;
  background: #5cc9f5;
  z-index: 1;
  animation: 0.2s;
}
.upload-demo {
  position: relative;
  z-index: 2;
  span {
    color: #526069;
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="header">
      <h4>图片库</h4>
      <span @click="close" class="close">x</span>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li @click="changeLeftIndex(0);" :class="{active : leftIndex == 0}">图片库</li>
          <li @click="changeLeftIndex(1);" :class="{active : leftIndex == 1}">最近使用</li>
          <li @click="changeLeftIndex(2);" :class="{active : leftIndex == 2}">我的上传</li>
        </ul>
        <div class="operation">
          <div class="item">
            <div class="progress-area"></div>
            <el-upload :on-success="uploadSuccess" :on-progress="uploadProgress" class="upload-demo" :data="form" action="//up-z2.qiniup.com" :before-upload="beforeUpload" :on-preview="handlePreview" :show-file-list="false">
              <span>上传</span>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="nav" v-if="leftIndex == 0 && navOption.length != 0">
          <ul class="nav-list">
            <li :key="item.typeId" @click="changeNav(index);" :class="{ active : navIndex == index}" v-for="(item, index) in navOption">{{ item.name }}</li>
          </ul>
        </div>
        <div class="right-content">
          <ul class="img-list">
            <li @click="choiceImage(item)" :style="{'background-image':`url(//p7h1y3vg2.bkt.clouddn.com/${item.path}?imageView2/2/w/230/h/230/q/75|imageslim)`}" :key="item.id" v-for="item in list"></li>
          </ul>
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
  //   name: "image",
  data() {
    return {
      types: types,
      list: [],
      curMusic: {},
      playMusicId: null,
      pageInfo: {
        pageSize: 18,
        total: 0,
        currentPage: 1
      },
      navOption: [],
      navIndex: 0,
      audio: null,
      leftIndex: 0,
      loading1: true,
      loading2: false,
      form: {
        key: "",
        token: ""
      }
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
    uploadProgress(event) {
      $(".progress-area").css("width", parseInt(event.percent) + "%");
      console.log("当前进度" + parseInt(event.percent));
    },
    uploadSuccess(response) {
      console.log(response);
      api.userUpload(response).then(res => {
        console.log(res);
      });
    },
    beforeUpload(file) {
      return api
        .getToken({
          fileName: file.name
        })
        .then(({ token, key }) => {
          this.form.key = key;
          this.form.token = token;
        });
    },
    handlePreview(file) {
      console.log(file);
    },
    /**
     * 关闭音乐面板
     */
    close() {
      this.closePanel(types.IMAGE);
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
    async choiceImage(item) {
      console.log(item);
      await api.choiceImage({
        id: item.id
      });
      let img = new Image();
      let path = `//p7h1y3vg2.bkt.clouddn.com/${
        item.path
      }?imageView2/2/w/230/h/230/q/75|imageslim`;
      img.src = path;
      img.onload = () => {
        this.addItem({
          type: types.IMAGE,
          path: path,
          width: img.width,
          height: img.height
        });
      };
      this.closePanel(types.IMAGE);
    },
    /**
     * 确认
     */
    async confirm() {
      //   this.curMusic.id &&
      // (await api.choiceImage({
      //   id: this.curMusic.id
      // }));
      //   this.updateMain({
      //     key: "music",
      //     val: this.curMusic
      //   });
      this.close();
    },
    get() {
      api
        .getImage({
          limit: this.pageInfo.pageSize,
          page: this.pageInfo.currentPage,
          typeId: this.navOption[this.navIndex].typeId,
          used: this.leftIndex == 1 ? 1 : '',
          isMy: this.leftIndex == 2 ? 1 : ''
        })
        .then(res => {
          this.list = res.result.data;
          this.pageInfo.total = res.result.info.total;
        });
    }
  },
  async mounted() {
    let { result = [] } = await api.getImageNav();
    this.navOption = result;
    this.get();
  }
};
</script>