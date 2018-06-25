
<template>
    <v-dialog :visible="visible" @close="visible=false" @changeData="toshow" judgeUpload="userUpload" accept="image/jpeg,image/jpg,image/png,image/gif" func="getShape" :pageSize="18" title="形状库" desc="矢量素材，可更换颜色，放大不失真" :list="list" :leftNav="leftNav" :navOption="typeList">
        <ul slot="content" class="img-list">
            <li @click="choiceShape(item, $event)" :style="{'background-image':`url(/store/${item.path})`}" :key="item.id" v-for="item in list"></li>
        </ul>
    </v-dialog>
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
                    name: "形状库"
                },
                {
                    name: "最近使用"
                }
            ],
            list: [],
            typeList: []
        };
    },
    methods: {
        init(params) {
            this.visible = true;
            let { callback } = params;
            this.callback = callback;
        },
        choiceShape(item) {
            api
                .getShapeContent({
                    id: item.id
                })
                .then(() => {
                    this.callback({
                        action: "confirm",
                        path: item.path
                    });
                    this.visible = false;
                });
        },
        toshow(list) {
            this.list = list;
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
        }
    },
    async mounted() {
        await this.getNav();
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/mixin";
.img-list {
    display: flex;
    flex-wrap: wrap;
    li {
        @include wh(115px, 115px);
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
        &:nth-child(n + 12) {
            margin-bottom: 0;
        }
    }
}
</style>
