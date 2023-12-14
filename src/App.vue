<template>
  <h1>你好</h1>
  <div class="box">123465</div>
  <el-button>123</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="primary" :icon="Edit">Edit</el-button>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
</script>
<style scoped lang="scss">
.box {
  width: 100px;
  height: 100px;
  background: pink;
}
</style>
