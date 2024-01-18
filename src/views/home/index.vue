<template>
  <div>home{{ userStore.username }}</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// 获取user仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

onMounted(() => {
  userStore.userInfo();
});
</script>

<style lang="scss" scoped></style>
