<style lang="scss" scoped>
    .wrapper {
        width: 970px;
        // height: 584px;
        background: #fff;
        border-radius: 6px;
        z-index: 9999999;
        position: absolute;
        left: 100px;
        top: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        .header {
            padding: 15px 20px;
            border-bottom: 1px solid #ccd5db;
            min-height: 21px;
            background-color: #f7f7f7;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h4 {
                font-size: 18px;
                font-weight: bold;
                span {
                    color: #a3afb7;
                    font-size: 12px;
                    padding-left: 10px;
                }
            }
            .close {
                display: block;
                width: 14px;
                height: 14px;
                color: #a3afb7;
                line-height: 14px;
                font-size: 21px;
                font-weight: bold;
                text-align: center;
            }
        }
        .main {
            display: flex;
            height: calc(100% - 56px);
            .left {
                width: 160px;
                background: #f7f7f7;
                ul {
                    li {
                        height: 50px;
                        line-height: 50px;
                        color: #76838f;
                        font-size: 14px;
                        text-indent: 20px;
                        cursor: pointer;
                        &:hover {
                            color: #1593ff;
                        }
                        &.active {
                            background: #fff;
                            border-top: 1px solid #ccd5db;
                            border-bottom: 1px solid #ccd5db;
                        }
                        &:first-child {
                            border-top: none;
                        }
                    }
                }
            }
            .right {
                padding: 20px;
                height: 480px;
                flex: 1;
                position: relative;
                ul {
                    height: 380px;
                    margin-bottom: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 115px;
                        height: 115px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        background-color: #e6ebed;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-size: contain;
                        &:nth-child(6n) {
                            margin-right: 0;
                        }
                    }
                }
                .footer {
                    position: absolute;
                    bottom: 20px;
                    // left: 0;
                }
            }
        }
    }

</style>

<template>
    <div class="wrapper">
        <div class="header">
            <h4>形状库
                <span>矢量素材，可更换颜色，放大不失真</span>
            </h4>
            <span class="close">x</span>
        </div>
        <div class="main">
            <div class="left">
                <ul>
                    <li @click="index=0" :class="{'active':index==0}">形状库</li>
                    <li @click="index=1" :class="{'active':index==1}">最近使用</li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li style="background-image:url(http://res1.eqh5.com/6947c350-bc11-42d1-855f-06bea9003bc1.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/56a8e094-c132-406a-8e9c-305b48f9bbec.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/329e4128-161f-4a92-9c60-d398f6883cad.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                    <li style="background-image:url(http://res1.eqh5.com/3d949db0-6f22-43e9-92d2-461ade74fce0.svg);"></li>
                </ul>
                <div class="footer">
                    <el-pagination background layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                index: 0
            }
        }
    }

</script>
