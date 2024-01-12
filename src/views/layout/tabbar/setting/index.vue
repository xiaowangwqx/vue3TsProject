<template>
  <el-button
    circle
    size="small"
    icon="Refresh"
    @click="updateRefresh"
  ></el-button>
  <el-button circle size="small" icon="FullScreen" @click="fullScreen"></el-button>
  <el-button circle size="small" icon="Setting"></el-button>
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

<script setup lang="ts">
// 获取setting小仓库
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();

// 刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
// 全屏按钮点击
const fullScreen=()=>{
  // DOM对象的一个属性：判断当前是不是全屏模式 全屏:true,不是全屏:false
   let full = document.fullscreenElement; 
  //  切换为全屏模式
  if(!full){
    document.documentElement.requestFullscreen();
  }else{
    document.exitFullscreen();
  }
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
};
</script>

<style scoped></style>
