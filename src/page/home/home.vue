<template>
	<router-view></router-view>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {};
    },
    created() {
        console.log("home");
    },
    methods: {
        ...mapActions(["setUser"])
    }
};
</script>