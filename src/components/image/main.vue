<template>
    <transition>
        <v-dialog type="image" :visible="visible" @close="visible=false" @changeData="toshow" judgeUpload="userUpload" accept="image/jpeg,image/jpg,image/png,image/gif" func="getImage" :pageSize="18" title="图片库" :list="list" :leftNav="leftNav" :navOption="navOption">
            <ul slot="content" class="img-list" v-if="list.length > 0">
                <li class="img-item" @click="choiceImage(item)" :style="item.style || {}" :key="index" v-for="(item, index) in list"></li>
            </ul>
        </v-dialog>
    </transition>
</template>
<script>
import * as api from "@/api";
import vDialog from "@/components/dialog/dialog2.vue";
export default {
    components: {
        vDialog
    },
    data() {
        return {
            visible: false,
            callback: () => {},
            leftNav: [
                {
                    name: "图片库"
                },
                {
                    name: "最近使用"
                },
                {
                    name: "我的上传"
                }
            ],
            list: [],
            navOption: []
        };
    },
    methods: {
        init(params) {
            this.visible = true;
            let { callback } = params;
            this.callback = callback;
        },
        choiceImage(item) {
            //记录最近使用
            api
                .choiceImage({
                    id: item.id
                })
                .then(() => {
                    this.callback({
                        action: "confirm",
                        path: `//p7d4z759a.bkt.clouddn.com/${
                            item.path
                        }?imageView2/2/w/230/h/230/q/75|imageslim`
                    });
                    this.visible = false;
                });
        },
        toshow(list) {
            this.list = list;
            for (let i = 0; i < this.list.length; i++) {
                let img = new Image();
                img.src = `//p7d4z759a.bkt.clouddn.com/${
                    this.list[i].path
                }?imageView2/2/w/230/h/230/q/75|imageslim`;
                img.onload = () => {
                    this.$set(this.list[i], "style", {
                        "background-image": `url(${img.src})`,
                        "background-size": "contain"
                    });
                };
            }
        }
    },
    mounted() {
        //获取导航信息
        api.getImageNav().then(({ result }) => {
            this.navOption = result;
        });
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";
.img-list {
    display: flex;
    flex-wrap: wrap;
    .img-item {
        @include wh(115px, 115px);
        margin: 0 15px 15px 0;
        background-image: url(data:image/svg+xml,<svg%20width%3D%2744%27%20height%3D%2744%27%20viewBox%3D%270%200%2044%2044%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20stroke%3D%27%23fff%27><g%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%20stroke-width%3D%272%27><circle%20stroke%3D%27%2376838f%27%20cx%3D%2722%27%20cy%3D%2722%27%20r%3D%271%27><animate%20attributeName%3D%27r%27%20begin%3D%270s%27%20dur%3D%271.8s%27%20values%3D%271%3B%2020%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.165%2C%200.84%2C%200.44%2C%201%27%20repeatCount%3D%27indefinite%27%20/><animate%20attributeName%3D%27stroke-opacity%27%20begin%3D%270s%27%20dur%3D%271.8s%27%20values%3D%271%3B%200%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.3%2C%200.61%2C%200.355%2C%201%27%20repeatCount%3D%27indefinite%27%20/></circle><circle%20stroke%3D%27%2376838f%27%20cx%3D%2722%27%20cy%3D%2722%27%20r%3D%271%27><animate%20attributeName%3D%27r%27%20begin%3D%27-0.9s%27%20dur%3D%271.8s%27%20values%3D%271%3B%2020%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.165%2C%200.84%2C%200.44%2C%201%27%20repeatCount%3D%27indefinite%27%20/><animate%20attributeName%3D%27stroke-opacity%27%20begin%3D%27-0.9s%27%20dur%3D%271.8s%27%20values%3D%271%3B%200%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.3%2C%200.61%2C%200.355%2C%201%27%20repeatCount%3D%27indefinite%27%20/></circle></g></svg>);
        background-size: 40px 40px;
        background-color: #e6ebed;
        background-repeat: no-repeat;
        background-position: center center;
        cursor: pointer;
        &:nth-child(6n) {
            margin-right: 0;
        }
        &:nth-child(n + 12) {
            margin-bottom: 0;
        }
    }
}
</style>
