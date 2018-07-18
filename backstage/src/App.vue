<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import * as api from "@/api";

export default {
    methods: {
        ...mapMutations(["UPDATE_USER_INFO"])
    },
    created() {
        api.getUserInfo().then(({ result }) => {
            if (result) {
                this.UPDATE_USER_INFO({
                    username: result.username,
                    uid: result.uid
                });
            }
        });
    }
};
</script>
<style lang="scss" scoped>
</style>