<template>
    <section style="padding:12px 20px">
        <div style="display:flex;justify-content:space-between;padding:8px 0;">
            <label>点击事件</label>
            <el-radio-group style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;" size="mini" :value="data.type">
                <el-radio @change="updateItem({key: 'event', val: {type: 0 }})" :label="0">无</el-radio>
                <el-radio @change="updateItem({key: 'event', val: {type: 1 }})" :label="1">链接</el-radio>
                <el-radio @change="updateItem({key: 'event', val: {type: 2 }})" :label="2">电话</el-radio>
            </el-radio-group>
        </div>
        <div v-if="data.type == 1" style="display:flex;justify-content:space-between;padding:8px 0;align-items:center;">
            <label>链接地址</label>
            <el-input :title="data.url" size="mini" @input="updateItem({key: 'event', val: {url: $event }});" :value="data.url" placeholder="网址"></el-input>
        </div>
        <div v-else-if="data.type == 2" style="display:flex;justify-content:space-between;padding:8px 0;align-items:center;">
            <label>手机/电话</label>
            <el-input size="mini" @input="updateItem({key: 'event', val: {tel: $event }});" :value="data.tel" placeholder="010-88888888"></el-input>
        </div>
    </section>
</template>
<script>
import $ from "jquery";
import { mapActions, mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["curItem"]),
        data() {
            let event = this.curItem.event || {};
            if ($.isEmptyObject(event)) {
                event = {
                    type: 0,
                    url: "",
                    tel: ""
                };
            }
            return event;
        }
    },
    methods: {
        ...mapActions(["updateItem"])
    }
};
</script>

<style lang="scss" scoped>
.el-radio {
    line-height: 20px;
    font-size: 12px;
}
</style>
