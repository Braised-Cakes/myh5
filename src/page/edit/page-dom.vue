<template>
    <div style="padding:12px 20px;">
        <div class="style-item">
            <label>纯色背景</label>
            <!-- {{currentPhone}} -->
            <el-color-picker @active-change="updatePhone({key:'style', val:{'background':$event}})" :value="currentPhone.main['background'] || '#fff'"
                show-alpha></el-color-picker>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from 'vuex'
    import $ from 'jquery'
    export default {
        components: {},
        computed: {
            ...mapGetters(['currentItem', 'currentPhone'])
        },
        methods: {
            ...mapActions(['updateItem', 'updatePhone'])
        },
        mounted() {},
        data() {
            return {}
        }
    }

</script>
<style lang="scss" scoped>
    .style-item {
        padding: 8px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

</style>
