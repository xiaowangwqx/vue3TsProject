<template>
  <div>
    <div class="box">测试svg</div>
    <svg-icon
      width="50px"
      height="50px"
      name="lock"
      color="backpink"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {reqLogin} from './api/user/index'
onMounted(()=>{
  reqLogin({username:'admin',password:'111111'})
})
</script>
<style scoped lang="scss">
.box {
  width: 100px;
  height: 100px;
}
</style>
