<template>
    <v-dialog :visible="visible" type="music" @close="close" judgeUpload="userUploadMusic" @confirm="confirm" @changeData="list = $event" func="getMusic" :pageSize="10" accept="audio/*" title="音乐库" :list="list" :leftNav="leftNav" :navOption="navOption">
        <div slot="content">
            <ul v-if="list.length > 0" class="img-list">
                <li @click="choiceMusic(item)" :class="{'active':item.id == curMusic.id}" :key="item.id" v-for="item in list">
                    <p>{{item.name}}</p>
                    <div @click="play(item)" class="button">
                        <i v-if="playMusicId != item.id" class="icon iconfont icon-bofang"></i>
                        <i v-if="playMusicId == item.id" class="icon iconfont icon-zanting"></i>
                    </div>
                </li>
            </ul>
            <div v-if="curMusic.id">
                <span>已选择:{{curMusic.name}}</span>
                <span @click="cancelChoiceMusic" style="margin-left:15px;cursor:pointer;">
                    <i class="icon iconfont icon-qingchu"></i>
                </span>
            </div>
        </div>
    </v-dialog>
</template>
<script>
import $ from "jquery";
import * as api from "@/api";
import store from "@/store/index";
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
                    name: "音乐库"
                },
                {
                    name: "最近使用"
                },
                {
                    name: "我的上传"
                }
            ],
            list: [],
            curMusic: {},
            playMusicId: null,
            navOption: [],
            navIndex: 0,
            audio: null
        };
    },
    methods: {
        init(params) {
            this.visible = true;
            let { callback } = params;
            this.callback = callback;
        },
        /**
         * 关闭音乐面板
         */
        close() {
            this.visible = false;
        },
        /**
         * 选择音乐
         */
        choiceMusic(item) {
            this.curMusic = item;
        },
        /**
         * 取消选择音乐
         */
        cancelChoiceMusic() {
            this.curMusic = {};
        },
        /**
         * 确认
         */
        async confirm() {
            this.curMusic.id &&
                (await api.choiceMusic({
                    id: this.curMusic.id
                }));
            this.callback({
                action: "confirm",
                music: this.curMusic
            });
            this.close();
        },
        /**
         * 暂停音乐
         */
        pause() {
            this.audio && this.audio.pause();
            this.playMusicId = null;
        },
        /**
         * 播放音乐
         */
        play(item) {
            if (this.audio) {
                this.audio.pause();
            } else {
                this.audio = document.createElement("audio");
            }
            if (item.id == this.playMusicId) {
                this.playMusicId = null;
                return;
            }
            this.audio.src = `http://p7d4z759a.bkt.clouddn.com/${item.path}`;
            this.audio.play();
            this.playMusicId = item.id;
            this.audio.onended = function() {
                this.playMusicId = null;
            };
        }
    },
    async mounted() {
        let { result = [] } = await api.getMusicNav();
        this.navOption = result;
        this.curMusic = $.extend(
            true,
            {},
            store.getters.phoneData.main.music || {}
        );
    }
};
</script>
<style lang="scss" scoped>
@import "~@/css/variables.scss";
.img-list {
    height: 300px;
    margin-bottom: 20px;
    li {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        background: #e6ebed;
        cursor: pointer;
        .icon {
            font-size: 12px;
            color: #ccc;
        }
        &:nth-child(2n) {
            background: #fff;
        }
        &:hover,
        &.active {
            background: #2495fc;
            color: #fff;
            .icon {
                color: #fff;
            }
        }
    }
}
</style>