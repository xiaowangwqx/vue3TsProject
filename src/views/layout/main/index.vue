<template>
  <!-- 路由组件出口 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
// 获取setting仓库
import useLayoutSettingStore from '@/store/modules/setting';
import { watch, ref, nextTick } from 'vue';

let layoutStoreSetting = useLayoutSettingStore();
console.log(layoutStoreSetting, 'layoutStoreSetting');

// 当前组件是否销毁重建
let flag = ref(true);

// 监听setting仓库内部数据是否发生变化，如果发生变化，说明用户点击了刷新按钮
watch(
  () => layoutStoreSetting.refresh,
  () => {
    // 点击刷新按钮，路由组件销毁
    flag.value = false;
    // 当响应式数据发生变化后，可以获取到变化后的dom
    nextTick(() => {
      flag.value = true;
    });
  },
);
</script>
<script lang="ts">
export default {
  name: 'Main',
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  //   transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  //   transform: scale(1);
}
</style>
