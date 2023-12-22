<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scorllbar">
        <!-- 菜单组件 -->
        <el-menu background-color="#001529" text-color="#fff" :default-active="$route.path" >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部面包屑导航 -->
    <div class="layout-tabbar">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout-main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';

// 引入logo子组件
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import useUserStore from '@/store/modules/user';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue'

let $route=useRoute();
let userStore = useUserStore();
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

  .scorllbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }
}

.layout-tabbar {
  position: fixed;
  top: 0;
  left: $base-menu-with;
  width: calc(100% - $base-menu-with);
  height: $base-tabbar-height;
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
}
</style>
