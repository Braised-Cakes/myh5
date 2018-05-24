<template>
	<div>
		<div class="setting-bg"></div>
		<div class="left">
			<div class="phone"></div>
		</div>
		<div class="right">
			<div class="basic-info">
				<div class="cover-img">
					<img src="@/img/logo2.png" />
					<span>更换封面</span>
				</div>
				<div>
					<span>标题</span>
					<el-input v-model="form.title"></el-input>
					<span>描述</span>
					<el-input v-model="form.desc"></el-input>
				</div>
			</div>
			<div class="setting-operations">
				<el-button @click="save">确定</el-button>
				<el-button>取消</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";
import * as api from "@/api/index";
export default {
  computed: {
    ...mapGetters(["otherInfo"])
  },
  watch: {
    otherInfo: {
      handler: function(val, oldVal) {
        this.form = $.extend(true, {}, val);
        this.form.id = this.$route.params.id;
      },
      deep: true
    }
  },
  data() {
    return {
      form: {
        id: this.$route.params.id,
        title: "",
        desc: ""
      }
    };
  },
  methods: {
    save() {
      api.sceneUpdate(this.form).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.setting-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 56px;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1042;
}
.left {
  position: fixed;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 640px;
  z-index: 1050;
  overflow: hidden;
  .phone {
    width: 326px;
    height: 596px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -163px;
    margin-top: -298px;
    background: url(~@/img/bg.svg);
  }
}
.right {
  position: fixed;
  width: 640px;
  top: 56px;
  right: 0;
  bottom: 0;
  z-index: 1050;
  background-color: #fff;
  overflow-y: auto;
  font-size: 12px;
  color: #76838f;
  .basic-info {
    display: flex;
    .cover-img {
      width: 180px;
      height: 180px;
      position: relative;
      span {
        position: absolute;
        left: 45px;
        bottom: 20px;
        height: 30px;
        width: 90px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccd5db;
        cursor: pointer;
        border-radius: 3px;
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
