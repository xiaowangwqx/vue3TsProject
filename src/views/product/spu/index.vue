<template>
  <Category :disabled="isAdd"></Category>
  <el-card style="margin: 10px 0">
    <div v-if="!isAdd">
      <el-button
        :disabled="!categoryStore.c3Id"
        icon="Plus"
        type="primary"
        @click="addSpu"
      >
        添加SPU
      </el-button>
      <el-table :data="spuList" border style="width: 100%; margin: 10px 0">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="spuName" label="SPU名称" />
        <el-table-column
          prop="description"
          show-overflow-tooltip
          label="SPU描述"
        />
        <el-table-column label="操作">
          <template #default="{ row, index }">
            <el-button size="small" type="primary" icon="Plus" />
            <el-button size="small" type="warning" icon="Edit" />
            <el-button size="small" type="info" icon="View" />
            <el-button size="small" type="error" icon="Delete" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :background="true"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @size-change="getSpuList(1)"
        @current-change="getSpuList"
      />
    </div>
    <div v-else>123456</div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import useCatagoryStore from '@/store/modules/category';
import { reqSpuList } from '@/api/product/spu/index';
import type { responseSpuData, spuObj } from '@/api/product/spu/type';

let categoryStore = useCatagoryStore();

let spuList = ref<spuObj[]>([]);
let isAdd = ref<boolean>(false);
let pageSizes = reactive<number[]>([3, 6, 9, 12, 15]);
let currentPage = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);

watch(
  () => categoryStore.c3Id,
  (newVal, oldVal) => {
    spuList.value = [];
    if (newVal) {
      getSpuList();
    }
  },
);

const getSpuList = async (page = 1) => {
  currentPage.value = page;
  let res: responseSpuData = await reqSpuList(
    currentPage.value,
    pageSize.value,
    categoryStore.c3Id,
  );
  console.log(res, 'spuList');
  if (res.code == 200) {
    spuList.value = res.data.records;
    total.value = res.data.total;
  }
};

const addSpu = () => {
  isAdd.value = true;
};
</script>

<style scoped></style>
