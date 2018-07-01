<template>
    <header>
        <div class="same-content">
            <router-link style="height:60px;" to="/list">
                <img src="@/img/logo_header.png" />
            </router-link>
            <ul class="nav-list">
                <li class="active">
                    <a>我的场景</a>
                </li>
            </ul>
            <a class="logout" @click="logout">登出</a>
        </div>
    </header>
</template>
<script>
import * as api from "@/api";

export default {
    methods: {
        async logout() {
            await api.userLogout();
            this.$router.push({
                name: "login"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";

header {
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #e6ebed;
    font-size: 14px;
}
.same-content {
    width: 1180px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-list {
        display: flex;
        li {
            position: relative;
            line-height: 60px;
            cursor: pointer;
            a {
                display: block;
                height: 60px;
                padding: 0 11px;
                &::before {
                    position: absolute;
                    @include wh(100%, 0);
                    left: 0;
                    bottom: -1px;
                    content: "";
                    border-bottom: 2px solid #59c7f9;
                    -webkit-transform: scaleX(0);
                    transform: scaleX(0);
                    transition: transform 0.25s ease;
                }
            }
            &:hover,
            &.active {
                color: #59c7f9;
                a::before {
                    transform: scaleX(1);
                }
            }
        }
    }
}
</style>
