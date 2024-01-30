<template>
  <div>
    <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
  </div>
</template>

<script setup lang="ts">
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
<style scoped lang="scss"></style>
