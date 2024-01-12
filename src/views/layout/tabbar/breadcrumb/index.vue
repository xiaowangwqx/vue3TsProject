<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
  <!-- 面包屑动态展示路由 -->
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path" >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';

let layoutStore = useLayoutSettingStore();

const changeIcon = () => {
  layoutStore.fold = !layoutStore.fold;
};
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
};
</script>

<style scoped></style>
