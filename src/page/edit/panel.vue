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
  <div class="wrapper" ref="bbb">
    <div class="header">
      <h4>形状库
        <span>矢量素材，可更换颜色，放大不失真</span>
      </h4>
      <span @click="CLOSE_PANEL(types.SHAPE)" class="close">x</span>
    </div>
    <div class="main">
      <div class="left">
        <ul>
          <li @click="changeNav(0)" :class="{'active':navIndex == 0}">形状库</li>
          <li @click="changeNav(1)" :class="{'active':navIndex == 1}">最近使用</li>
        </ul>
      </div>
      <div class="right">
        <div class="nav" v-if="typeList.length > 0 && navIndex == 0">
          <ul class="nav-list">
            <li @click="changeType(index)" :class="{'active' : typeIndex == index}" :key="item.typeId" v-for="(item, index) in typeList">{{item.name}}</li>
          </ul>
          <ul class="tag-list">
            <li @click="changeTag(index)" :class="{'active' : tagIndex == index}" :key="item.tagId" v-for="(item, index) in typeList[typeIndex].children">{{item.name}}</li>
          </ul>
        </div>
        <div class="right-content">
          <ul class="img-list">
            <li @click="choiceShape(item, $event)" :style="{'background-image':`url(store/${item.path})`}" :key="item.id" v-for="item in list">
            </li>
          </ul>
          <div class="footer">
            <el-pagination :current-page.sync="pageInfo.currentPage" background @current-change="get" :page-size="pageInfo.pageSize" layout="prev, pager, next" :total="pageInfo.total"></el-pagination>
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
import { mapState, mapActions,mapMutations } from "vuex";
export default {
  name: "panel",
  data() {
    return {
      types: types,
      navIndex: 0,
      list: [],
      pageInfo: {
        pageSize: 18,
        total: 0,
        currentPage: 1
      },
      typeList: [],
      typeIndex: 0,
      tagIndex: 0,
      choiceSrc: ""
    };
  },
  computed: {
    ...mapState({
      panel: state => state.edit.panel
    })
  },
  methods: {
    ...mapActions(["addItem"]),
    ...mapMutations(["CLOSE_PANEL"]),
    changeNav(index) {
      this.navIndex = index;
      this.pageInfo.currentPage = 1;
      this.get();
    },
    changeType(index) {
      this.typeIndex = index;
      this.tagIndex = 0;
      this.pageInfo.currentPage = 1;
      this.get();
    },
    changeTag(index) {
      this.tagIndex = index;
      this.pageInfo.currentPage = 1;
      this.get();
    },
    choiceShape(item) {
      let dom = $(`<embed src="store/${item.path}"></embed>`);
      $(dom).on("load", () => {
        let docs = dom[0].getSVGDocument();
        $(dom).remove();
        this.CLOSE_PANEL(types.SHAPE);
        this.addItem({
          type: types.SHAPE,
          path: item.path,
          content: $(docs)
            .find("svg")
            .prop("outerHTML")
            .match(/<svg[\s\S]+/)[0]
        });
      });
      $("#svg_cache").append(dom);
      // embed
      api
        .getShapeContent({
          id: item.id
        })
        .then(() => {
          // this.CLOSE_PANEL(types.SHAPE);
          // console.log(result.match(/<svg[\s\S]+/)[0])
          // this.addItem({
          //   type: types.SHAPE,
          //   content: result.match(/<svg[\s\S]+/)[0]
          // });
        });
    },
    get() {
      api
        .getShape({
          limit: this.pageInfo.pageSize,
          page: this.pageInfo.currentPage,
          typeId: this.typeList[this.typeIndex].typeId,
          used: this.navIndex == 0 ? "" : 1,
          tagId:
            this.typeList[this.typeIndex] &&
            this.typeList[this.typeIndex].children &&
            this.typeList[this.typeIndex].children[this.tagIndex].tagId
        })
        .then(res => {
          this.list = res.result.data;
          this.pageInfo.total = res.result.info.total;
        });
    },
    async getNav() {
      const { result } = await api.getShapeNav();
      result.forEach(item => {
        item.children.unshift({
          name: "全部",
          tagId: ""
        });
      });
      result.unshift({
        name: "全部",
        typeId: ""
      });
      this.typeList = result;
      this.typeIndex = 0;
    }
  },
  async mounted() {
    await this.getNav();
    this.get();
  }
};
</script>