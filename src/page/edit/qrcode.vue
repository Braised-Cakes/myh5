

<template>
	<div class="qrcode-section">
		<div class="header">
			<h4>二维码</h4>
			<span @click="CLOSE_PANEL(types.QRCODE)" class="close">x</span>
		</div>
		<section class="main">
			<div class="left">
				<div class="item">
					<label>链接</label>
					<el-input v-model="url" size="mini" placeholder="http://www.baidu.com"></el-input>
				</div>
				<div class="item">
					<label>边距</label>
					<el-input-number v-model="margin" size="mini" :max="4" :step="1" :min="0"></el-input-number>
				</div>
				<div class="item">
					<label></label>
					<el-button @click="create" size="mini" type="success">生成</el-button>
				</div>
			</div>
			<div class="right">
				<div v-loading="loading">
					<img class="qr-image" :src="src" />
				</div>
				<footer>
					<el-button @click="CLOSE_PANEL(types.QRCODE)" size="mini">取消</el-button>
					<el-button @click="confirm" size="mini" type="success" :disabled="loading">确定</el-button>
				</footer>
			</div>
		</section>
	</div>
</template>
<script>
import * as api from "@/api";
import * as types from "@/tpl/types";
import { mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            types: types,
            url: "",
            margin: 2,
            loading: false,
            src:
                ""
        };
    },
    methods: {
        ...mapActions(["addItem"]),
        ...mapMutations(["CLOSE_PANEL"]),
        create() {
            if (!this.url) {
                this.$message.error("请填写链接");
            } else {
                this.loading = true;
                api
                    .createQRCode({
                        url: encodeURIComponent(this.url),
                        margin: this.margin
                    })
                    .then(({ result }) => {
                        this.src = result;
                        this.loading = false;
                    });
            }
        },
        confirm() {
            this.addItem({
                type: this.types.QRCODE,
                url: this.src
            });
            this.CLOSE_PANEL(types.QRCODE);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/variables.scss";
.qrcode-section {
    width: 470px;
    background: #fff;
    border-radius: 6px;
    z-index: $panelZIndex;
    position: absolute;
    margin-left: 50%;
    left: -235px;
    top: 80px;
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
        height: 280px;
        padding: 20px;
        .left {
            width: 300px;
            display: flex;
            flex-direction: column;
            .item {
                display: flex;
                align-items: center;
                height: 40px;
                line-height: 40px;
                label {
                    min-width: 50px;
                }
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .qr-image {
                width: 200px;
                border: 1px solid #dce0e2;
            }
        }
    }
}
</style>