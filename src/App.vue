<template>
    <router-view></router-view>
</template>

<script>
    import * as api from './api/index'
    import $ from 'jquery'
    export default {
        data() {
            return {

            }
        },
        mounted() {
            // api.getUser().then((res)=>{
            //     console.log(res)
            // })

            $.ajax({
                url : '/user/',
                contentType: 'application/json',
                method: 'get',
                async: false,
                success(rs){
                    console.log(rs);
                }
            });
            // window.location.href = 'https://itebeta.baidu.com/login?service=http://xstpdev.baidu.com:3012/vue.html&appKey=uuapTestKey'
            // setTimeout(() => {
            // $.ajax({
            //     method: 'get',
            //     async: false,
            //     url: '/Env/list?build_type=all&creator_or_collector=all&is_creator=0&machine_cluster_id=all&micro_sys_id=all&page=1&pagecount=10&product_line=1&resource_type=all&status=all&tool_type_id=all',
            //     contentType: 'application/json',
            //     // headers: {
            //     //     'X-Requested-With': 'XMLHttpRequest'
            //     // },
            //     xhrFields: {
            //         withCredentials: false
            //     },
            //     dataType: 'json',
            //     crossDomain: true,
            // }).then((data) => {
            //     console.log(data)
            // });


            // fetch('/Env/list?build_type=all&creator_or_collector=all&is_creator=0&machine_cluster_id=all&micro_sys_id=all&page=1&pagecount=10&product_line=1&resource_type=all&status=all&tool_type_id=all', {
            //     method: 'get'
            // }).then(function (response) {
            //     return response.json();
            // }).then(function (j) {
            //     console.log(j); 
            // }).catch(function (err) {
            //     // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
            // });



            // $.ajax({
            //     method: 'get',
            //     async: false,
            //     url: '/Env/list?build_type=all&creator_or_collector=all&is_creator=0&machine_cluster_id=all&micro_sys_id=all&page=1&pagecount=10&product_line=1&resource_type=all&status=all&tool_type_id=all',
            //     contentType: 'application/json',
            //     // headers: {
            //     //     'X-Requested-With': 'XMLHttpRequest'
            //     // },
            //     xhrFields: {
            //         withCredentials: false
            //     },
            //     // dataType: 'json',
            //     // crossDomain: true,
            // }).then((data) => {
            //     console.log(data)
            // });

        }
    }

</script>
<style>


</style>
