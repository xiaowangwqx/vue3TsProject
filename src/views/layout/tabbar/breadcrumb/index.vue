<template>
    <el-icon style="margin-right: 10px;">
        <Expand />
    </el-icon>
    <el-icon>
        <Fold />
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">

</script>

<style scoped></style>