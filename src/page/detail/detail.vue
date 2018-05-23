<style lang="scss" scoped>
.nav {
  display: flex;
  li {
    margin-right: 60px;
    position: relative;
    a {
      font-size: 14px;
      line-height: 40px;
      height: 40px;
      &::before {
        content: "";
        height: 2px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #59c7f9;
        transform: scaleX(0);
        transition: transform 0.25s ease;
      }
    }
    &:hover {
      a::before {
        transform: scaleX(1);
      }
    }
    &.active {
      color: #59c7f9;
      a::before {
        transform: scaleX(1);
      }
    }
  }
}
.wrapper {
  height: 100vh;
  background: #f1f4f5;
}
.container {
  position: relative;
  margin: 30px auto;
  width: 1120px;
  height: 486px;
  padding: 30px;
  background: #fff;
}
.area-right {
  margin-left: 400px;
}
.base-info {
  display: flex;
  margin-bottom: 30px;
  img {
    width: 100px;
    height: 100px;
  }
  .right {
    margin-left: 20px;
    .title {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 14px;
    }
    .description {
      margin: 10px 0;
    }
    .create-time {
      margin: 10px 0;
    }
  }
}
.share-area {
  display: flex;
  .qrcode-wrap {
    width: 240px;
    height: 250px;
    padding-top: 40px;
    text-align: center;
    border: 1px solid #e6ebed;
    margin-right: 20px;
    .share-wx {
      height: 45px;
      line-height: 45px;
    }
  }
  .hot-share {
    line-height: 40px;
    height: 40px;
  }
  .share-group {
    display: flex;
    li {
      cursor: pointer;
      .share-btn {
        display: inline-block;
        text-align: center;
        border-radius: 3px;
        height: 40px;
        line-height: 40px;
        width: 120px;
        padding: 0;
        margin-right: 15px;
        font-size: 14px;
        color: #59c7f9;
        border: 1px solid #59c7f9;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.1s;
        .iconfont {
          font-size: 16px;
          line-height: 16px;
        }
        span {
          margin-left: 10px;
        }
      }
      &:hover {
        .share-btn {
          background: #5ec8f7;
          color: #fff;
        }
      }
    }
  }
  .share-url {
    display: flex;
    align-items: center;
    .copy-btn {
      margin-left: 10px;
    }
  }
}
</style>

<template>
    <div class="wrapper">
        <v-header></v-header>
        <ul class="nav">
            <li class="active">
                <a>社交分享</a>
            </li>
            <li>
                <a>效果统计</a>
            </li>
            <li>
                <a>数据汇总</a>
            </li>
        </ul>
        <div class="container">
            <div class="area-left">

            </div>
            <div class="area-right">
                <div class="base-info">
                    <img class="left" src="@/img/logo2.png" />
                    <div class="right">
                        <p class="title">副本-未命名场景4</p>
                        <p class="description">我用易企秀做了一个超酷炫的H5，快来看看吧。</p>
                        <p class="create-time">创建时间： 2018年05月18日 </p>
                    </div>
                </div>
                <div class="share-area">
                    <div class="qrcode-wrap">
                        <div><img style="width:160px;height:160px;" src="http://p7m90pgef.bkt.clouddn.com/259e21f16fe01e103fad34e7db286c2b.svg" /></div>
                        <p class="share-wx">扫一扫分享到微信</p>
                    </div>
                    <div>
                        <p class="hot-share">热门分享</p>
                        <ul class="share-group">
                            <li>
                                <a class="share-btn">
                                    <i class="icon iconfont icon-qq"></i>
                                    <span>QQ</span>
                                </a>
                            </li>
                            <li>
                                <a class="share-btn">
                                    <i class="icon iconfont icon-qqkongjian"></i>
                                    <span>QQ空间</span>
                                </a>
                            </li>
                            <li>
                                <a class="share-btn">
                                    <i class="icon iconfont icon-weibo"></i>
                                    <span>微博</span>
                                </a>
                            </li>
                        </ul>
                        <p class="hot-share">链接分享</p>
                        <div class="share-url">
                            <p>https://c.eqxiu.com/s/2maJI1PF</p>
                            <el-button data-clipboard-text="https://c.eqxiu.com/s/2maJI1PF" class="copy-btn" size="mini">复制链接</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import ClipboardJS from "clipboard";
export default {
  components: {
    vHeader: Header
  },
  mounted() {
    var clipboard = new ClipboardJS(".copy-btn");
    clipboard.on("success", e => {
      console.info("Action:", e.action);
      console.info("Text:", e.text);
      console.info("Trigger:", e.trigger);
      this.$message("复制成功");
      e.clearSelection();
    });

    clipboard.on("error", function(e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  }
};
</script>
