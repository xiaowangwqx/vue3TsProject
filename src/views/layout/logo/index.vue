<template>
    <div v-if="setting.logoHidden" class="logo">
        <img class="img" :src="setting.logo">
        <p>{{setting.title}}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';

</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    p {
        font-size: $base-menu-logo-fontSize;
        margin-left: 10px;
    }
}

.img {
    width: 40px;
    height: 40px;
}
</style>