<template>
  <div id="app">
    <router-view v-if="btn"></router-view>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      btn: true
    };
  },
  methods : {
    ...mapActions(['setUser'])
  },
  created() {
    // alert(1)
    // api.getUserInfo().then(res => {
    //   if(res.result){
        
    //   }
    //   // this.setUser({
        
    //   // })
    // });
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