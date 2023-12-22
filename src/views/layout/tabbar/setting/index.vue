<template>
  <el-button circle size="small" icon="Refresh" />
  <el-button circle size="small" icon="FullScreen" />
  <el-button circle size="small" icon="Setting" />
  <img
    style="width: 24px; height: 24px; margin: 0 10px"
    src="../../../../public/logo.png"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default{
  name:'Setting'
}
</script>

<style scoped></style>
