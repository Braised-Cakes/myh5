<template>
	<div id="app">
		<router-view v-if="btn"></router-view>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "@/api";
export default {
    data() {
        return {
            btn: true
        };
    },
    methods: {
        ...mapActions(["setUser"])
    },
    created() {
        // alert(1)
        api.getUserInfo().then(({ result }) => {
            if (result) {
                this.setUser({
                    username: result
                });
            }
        });
    },
    mounted() {
        // setTimeout(() => {
        //   this.btn = true;
        // }, 2000);
    }
};
</script>
<style>
</style>