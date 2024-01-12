<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div
      class="layout-slider"
      :class="{ fold: layoutStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scorllbar">
        <!-- 菜单组件 -->
        <el-menu
          background-color="#001529"
          text-color="#fff"
          :collapse="layoutStore.fold"
          :default-active="$route.path"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部面包屑导航 -->
    <div
      class="layout-tabbar"
      :class="{ fold: layoutStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout-main" :class="{ fold: layoutStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

// 引入logo子组件
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue';

let $route = useRoute();
let userStore = useUserStore();
let layoutStore = useLayoutSettingStore();
</script>

<script lang="ts">
export default {
  name: 'Layout',
};
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
}

.layout-slider {
  width: $base-menu-with;
  height: 100vh;
  background: $base-menu-background;
  color: #fff;
  transition: all 0.3s;

  .scorllbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }

  &.fold {
    width: $base-menu-min-width;
  }
}

.layout-tabbar {
  position: fixed;
  top: 0;
  left: $base-menu-with;
  width: calc(100% - $base-menu-with);
  height: $base-tabbar-height;
  transition: all 0.3s;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}

.layout-main {
  position: absolute;
  left: $base-menu-with;
  top: $base-tabbar-height;
  width: calc(100% - $base-menu-with);
  height: calc(100vh - $base-tabbar-height);
  background: pink;
  padding: 20px;
  overflow: auto;
  transition: all 0.3s;

  &.fold {
    width: calc(100vw - $base-menu-min-width);
    left: $base-menu-min-width;
  }
}
</style>
