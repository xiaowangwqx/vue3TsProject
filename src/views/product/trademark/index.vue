<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary">添加品牌</el-button>
    <el-table :data="tableData" border style="width: 100%; margin: 10px 0">
      <el-table-column width="80px" type="index" label="序号" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <template #default="scope">
          <img
            style="width: 100px; height: 100px"
            :src="scope.row.logoUrl"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="品牌操作">
        <template #default="scope">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="warning" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :background="true"
        layout=" prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { reqHasTrademark } from '@/api/product/tradeMark/index';
import type { Records, trademarkData } from '@/api/product/tradeMark/type';

let tableData = ref<Records>([]);
let pageSizes = reactive<number[]>([3, 6, 9, 12, 15]);
let currentPage = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);

onMounted(() => {
  getHasTrademark();
});
const getHasTrademark = async () => {
  let res: trademarkData = await reqHasTrademark(
    currentPage.value,
    pageSize.value,
  );
  if (res.code == 200) {
    tableData.value = res.data.records;
    total.value = res.data.total;
  }
  console.log(res, '品牌数据');
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getHasTrademark();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getHasTrademark();
};
</script>

<style scoped></style>
