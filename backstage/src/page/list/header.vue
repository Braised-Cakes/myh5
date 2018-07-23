<template>
    <header>
        <div class="same-content">
            <router-link class="logo" to="/list">
                <img src="@/img/logo_header.png" />
            </router-link>
            <ul class="nav-list">
                <li class="active">
                    <a>我的场景</a>
                </li>
            </ul>
            <a @click="logout">登出</a>
        </div>
    </header>
</template>
<script>
import * as api from "@/api";

export default {
    methods: {
        async logout() {
            await api.userLogout();
            this.$router.push({ name: "login" });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css/mixin";
$height: 60px;

header {
    height: $height;
    background: #fff;
    border-bottom: 1px solid #e6ebed;
    font-size: 14px;
}
.same-content {
    width: 1180px;
    margin: 0 auto;
    @include fj;
    align-items: center;
    .logo {
        height: $height;
    }
    .nav-list {
        @include fj;
        li {
            position: relative;
            line-height: $height;
            cursor: pointer;
            a {
                display: block;
                height: $height;
                padding: 0 11px;
                &::before {
                    position: absolute;
                    @include wh(100%, 0);
                    left: 0;
                    bottom: -1px;
                    content: "";
                    border-bottom: 2px solid #59c7f9;
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
