<template>
  <div>
    <ul class="ani-topbar">
      <li @click="addAni">
        <i class="icon iconfont icon-tianjia"></i>
        <span>添加动画</span>
      </li>
      <li @click="goAni">
        <i class="icon iconfont icon-tianjia"></i>
        <span>预览动画</span>
      </li>
    </ul>
    <ul class="ani-list">
      <li class="ani-item" :key="item" v-for="(item, index) in curItem.animation">
        <div class="title">
          <div class="left">
            <span>动画{{index + 1}}</span>
            <span class="ani-name">{{item | getLabel}}</span>
          </div>
          <div class="right">
            <span @click="delAni(index)" class="close">x</span>
          </div>
        </div>
        <div class="item-contain" style="padding:12px 20px;">
          <div class="style-item">
            <label>方式</label>
            <el-select size="mini" @change="change('animation-name', index, $event)" :value="item['animation-name']" placeholder="请选择">
              <el-option-group v-for="group in aniList" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </div>
          <div class="style-item">
            <label>动画时间</label>
            <el-input-number @change="change('animation-duration', index, $event)" size="mini" :value="item['animation-duration']" :step="0.1" :min="1" :max="20"></el-input-number>
          </div>
          <div class="style-item">
            <label>延迟时间</label>
            <el-input-number @change="change('animation-delay', index, $event)" size="mini" :value="item['animation-delay']" :step="0.1" :min="0" :max="20"></el-input-number>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";
import * as constant from "@/constant";
import * as utils from "@/utils";
export default {
  data() {
    return {
      aniList: constant.aniList
    };
  },
  computed: {
    ...mapGetters(["curItem"])
  },
  filters: {
    getLabel(item) {
      for (let i = 0; i < constant.aniList.length; i++) {
        for (let j = 0; j < constant.aniList[i].options.length; j++) {
          if (constant.aniList[i].options[j].value == item["animation-name"]) {
            return constant.aniList[i].options[j].label;
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(["updateItem"]),
    addAni() {
      let ani = $.extend(true, [], this.curItem.animation);
      ani.push({
        "animation-name": "none",
        "animation-duration": 1,
        "animation-delay": 0
      });
      console.log("刘少鹏");
      console.log(ani);
      this.updateItem({
        key: "animation",
        val: ani
      });
    },
    delAni(index) {
      let ani = $.extend(true, [], this.curItem.animation);
      ani.splice(index, 1);
      this.updateItem({
        key: "animation",
        val: ani
      });
    },
    change(type, index, val) {
      let ani = $.extend(true, [], this.curItem.animation);
      ani[index][type] = val;
      this.updateItem({
        key: "animation",
        val: ani
      });
      if (type == "animation-name") {
        this.goAni(index);
      }
    },
    goAni(index) {
      utils.runAni(this.curItem.id, this.curItem.animation, index);
    }
  }
};
</script>

<style lang="scss" scoped>
.ani-topbar {
  display: flex;
  justify-content: space-around;
  margin: 5px 0 15px 0;
  i {
    margin-right: 6px;
  }
  li {
    cursor: pointer;
    &:hover {
      color: #2495fc;
    }
  }
}

.ani-list {
  li {
    .title {
      display: flex;
      background: #f6f9fa;
      height: 34px;
      line-height: 34px;
      margin-bottom: 7px;
      border-top: 1px solid #e6ebed;
      border-bottom: 1px solid #e6ebed;
      justify-content: space-between;
      padding: 0 20px;
      .right {
        display: flex;
        span {
          font-size: 20px;
        }
        .close {
          // margin-right: 10px;
        }
      }
      .ani-name {
        background-color: rgba(89, 199, 249, 0.3);
        border-radius: 10px;
        max-width: 100px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #526069;
        margin: 7px 0;
        padding: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 10px;
      }
    }
  }
}

.style-item {
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
