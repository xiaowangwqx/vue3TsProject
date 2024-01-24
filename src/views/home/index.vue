<template>
  <div>home{{ userStore.username }}</div>
</template>

<script setup lang="ts">
// 获取user仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
