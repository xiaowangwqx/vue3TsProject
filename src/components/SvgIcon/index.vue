<template>
  <!-- svg图标外层容器节点，内部需与use标签结合使用 -->
  <svg :style="{ width: width, height: height }">
    <!-- xlink:href执行用哪一个图标，属性值务必 #icon-图标名字 -->
    <!-- use标签 fill属性用于设置图标的颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
// 接受父组件传过来的参数
defineProps({
  // xlink:href属性值前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用的图标名字
  name: {
    type: String,
  },
  // 接收父组件传递的颜色
  color: {
    type: String,
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
});
</script>

<style scoped></style>
