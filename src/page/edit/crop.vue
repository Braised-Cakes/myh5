<template>
    <div class="wrap">
         <img id="image" src="@/img/logo2.png">
    </div>
</template>

<script>
import $ from 'jquery'
// import Cropper from 'cropper'

// console.log($image.cropper)
export default {
    mounted(){
        // var $image = $('#image');
        // $image.cropper();
        // // var $image = $('#image');
        // // var cropper = new Cropper(image, options);  
    }
}
</script>

<style lang="scss" scoped>
.wrap{
    position: relative;
    z-index: 1231231;
    width:100%;
    height:800px;
    background: #fff;
}
img {
  max-width: 100%; /* This rule is very important, please do not ignore this! */
}
</style>
