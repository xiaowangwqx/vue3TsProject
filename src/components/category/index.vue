<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          :disabled="disabled"
          v-model="categoryStore.c1Id"
          placeholder="请选择一级分类"
          @change="c1Change"
        >
          <el-option
            v-for="c1 in categoryStore.c1Option"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="!categoryStore.c1Id || disabled"
          v-model="categoryStore.c2Id"
          placeholder="请选择二级分类"
          @change="c2Change"
        >
          <el-option
            v-for="c1 in categoryStore.c2Option"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="!categoryStore.c2Id || disabled"
          v-model="categoryStore.c3Id"
          placeholder="请选择三级分类"
          @change="c3Change"
        >
          <el-option
            v-for="c1 in categoryStore.c3Option"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCatagoryStore from '@/store/modules/category';
let categoryStore = useCatagoryStore();
defineProps(['disabled']);

onMounted(() => {
  getC1();
});

const getC1 = () => {
  // 通知分类仓库 获取一级分类数据
  categoryStore.getC1();
};

const c1Change = () => {
  categoryStore.getC2();
  categoryStore.c2Id = '';
  categoryStore.c2Option = [];
  categoryStore.c3Option = [];
  categoryStore.c3Id = '';
};
const c2Change = () => {
  categoryStore.c3Id = '';
  categoryStore.c3Option = [];
  categoryStore.getC3();
};
const c3Change = () => {
  console.log('c3Change');
};
</script>

<style lang="scss" scoped></style>
