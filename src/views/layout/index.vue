<template>
    <div class="layout-container">
        <!-- 左侧菜单 -->
        <div class="layout-slider">123</div>
        <!-- 顶部面包屑导航 -->
        <div class="layput-tabbar">456</div>
        <!-- 内容展示区域 -->
        <div class="layout-main">789</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout-container{
    width: 100%;
    height: 100vh;
}
.layout-slider{
    width: $base-menu-with;
    height:100vh;
    background: $base-menu-background;
}
.layput-tabbar{
    position: fixed;
    top: 0;
    left: $base-menu-with;
    width:calc(100% - $base-menu-with);
    height: $base-tabbar-height;
    background: skyblue;
}
.layout-main{
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