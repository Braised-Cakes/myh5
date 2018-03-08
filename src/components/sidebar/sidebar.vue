<template>
    <nav>
        <ul>
            <li class="menu" v-for="item in nav">
                <span class="menu-title">{{item.name}}</span>
                <ul>
                    <router-link class="menu-item" tag="li" v-for="$item in item.children" :key="item.id" :to="{'name': $item.id}">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="'#icon-' + $item.icon"></use>
                        </svg>
                        {{$item.name}}
                    </router-link>
                </ul>
            </li>
        </ul>
    </nav>
    <!-- <ul><li v-for="i in new Array(200)">123</li></ul> -->
</template>

<script>
    export default {
        props: {
            nav: Array
        },
        data() {
            return {}
        }
    }

</script>

<style lang="scss" scoped>
    .menu {
        font-size: 16px;
        border-bottom: dashed 1px #e6e7e4;
        padding-top: 10px;
        color: #666;
        &:last-child {
            border-bottom: none;
        }
        .menu-title {
            line-height: 40px;
            margin-left: 25px;
        }

        .menu-item {
            line-height: 45px;
            text-indent: 30px;
            cursor: pointer;
            &.active {
                background: #d2e9bb;
            }
            .icon {
                margin-right: 10px;
            }
        }
    }

    .icon {
        font-size: 20px;
    }

</style>
