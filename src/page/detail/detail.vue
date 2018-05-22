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
.base-info {
  display: flex;
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
      }
      &:hover {
        .share-btn {
          background: #5ec8f7;
          color: #fff;
        }
      }
    }
  }
}
</style>

<template>
    <div>
        <v-header></v-header>
        <ul class="nav">
            <li>
                <a>数据汇总</a>
            </li>
            <li class="active">
                <a>数据汇总</a>
            </li>
            <li>
                <a>数据汇总</a>
            </li>
            <li>
                <a>数据汇总</a>
            </li>
        </ul>
        <div>
            <div class="left"></div>
            <div class="right">
                <div class="base-info">
                    <img class="left" src="http://res.eqxiu.com/group2/M00/7F/9B/yq0KXlZNGfWAbZo_AAAdI0Feqt0138.png" />
                    <div class="right">
                        <p class="title">副本-未命名场景</p>
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
                                <a class="share-btn">QQ</a>
                            </li>
                            <li>
                                <a class="share-btn">QQ</a>
                            </li>
                        </ul>
                        链接分享 https://c.eqxiu.com/s/2maJI1PF
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/header/header.vue";
export default {
  components: {
    vHeader: Header
  }
};
</script>
