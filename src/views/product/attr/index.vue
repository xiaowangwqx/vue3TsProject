<template>
  <Category :disabled="isAdd" />
  <el-card style="margin: 10px 0">
    <div v-if="!isAdd">
      <el-button
        :disabled="!categoryStore.c3Id"
        type="primary"
        icon="Plus"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table :data="AttrList" border style="margin: 10px 0">
        <el-table-column
          width="80px"
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="180px"
        ></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="scope">
            <el-tag
              v-for="(tag, index) in scope.row.attrValueList"
              :key="index"
              style="margin: 10px"
              type="primary"
            >
              {{ tag.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="editAttr(scope.row)"
            ></el-button>
            <el-popconfirm
              title="确定要删除吗?"
              @confirm="deleteAttr(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="error" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-form :inline="true" :model="form">
        <el-form-item prop="attrName" label="属性名称">
          <el-input
            v-model="form.attrName"
            placeholder="请输入属性名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex">
        <el-button
          type="primary"
          :disabled="!form.attrName"
          icon="Edit"
          @click="onAddAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
      <el-table :data="form.attrValueList" border style="margin: 10px 0">
        <el-table-column
          width="80px"
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column label="属性值名称">
          <template #default="scope">
            <el-input
              :ref="(vc: any) => (inputArr[scope.$index] = vc)"
              v-if="scope.row.flag"
              placeholder="请输入属性值名称"
              v-model="scope.row.valueName"
              @blur="onBlur(scope.row, scope.$index)"
            ></el-input>
            <div v-else @click="toElInput(scope.row, scope.$index)">
              {{ scope.row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, index }">
            <el-button
              size="small"
              type="warning"
              icon="Delete"
              @click="onDeleteAttrValue(index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex">
        <el-button
          type="primary"
          :disabled="form.attrValueList.length == 0"
          @click="onConfirm"
        >
          确定
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch, onBeforeUnmount } from 'vue';
import useCatagoryStore from '@/store/modules/category';
import type {
  attrListResponseData,
  attrObj,
  attrValueObj,
} from '@/api/product/attr/type';
import {
  reqAttrList,
  reqAddOrEditAttr,
  reqDeleteAttr,
} from '@/api/product/attr';
import { ElMessage } from 'element-plus';
let categoryStore = useCatagoryStore();
let AttrList = ref<attrObj[]>([]);
let isAdd = ref<boolean>(false);
let form = reactive<attrObj>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3, //代表三级分类
});
let inputArr = ref<any>([]);

watch(
  () => categoryStore.c3Id,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, 'newVal,oldVal');
    AttrList.value = [];
    if (newVal) {
      console.log(newVal, 'newVal');
      getAttrList();
    }
  },
);

onBeforeUnmount(() => {
  // 重置pinia 仓库 属性小仓库中的数据
  categoryStore.$reset();
});

const getAttrList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  let res: attrListResponseData = await reqAttrList(c1Id, c2Id, c3Id);
  console.log(res, '分类列表');
  if (res.code == 200) {
    AttrList.value = res.data;
  }
};

const addAttr = () => {
  isAdd.value = true;
};
const editAttr = (row: attrObj) => {
  isAdd.value = true;
  Object.assign(form, JSON.parse(JSON.stringify(row)));
  form.attrValueList.map((item) => {
    item.flag = false;
  });
};
const deleteAttr = async (row: attrObj) => {
  console.log(row, 'row');
  let res: any = await reqDeleteAttr(row.id);
  if (res.code == 200) {
    console.log(res, '删除属性');
    getAttrList();
    ElMessage({
      type: 'success',
      message: '删除属性成功',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '删除属性失败',
    });
  }
};

const onConfirm = async () => {
  form.categoryId = categoryStore.c3Id;
  console.log(form, 'form');
  let res: any = await reqAddOrEditAttr(form);
  if (res.code == 200) {
    onCancel();
    getAttrList();
    ElMessage({
      type: 'success',
      message: '操作属性成功',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '操作属性失败',
    });
  }
};

const onCancel = () => {
  isAdd.value = false;
  let resetForm = {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3, //代表三级分类
  };
  Object.assign(form, resetForm);
};

const onAddAttrValue = () => {
  let obj = {
    valueName: '',
    flag: true,
  };
  form.attrValueList.push(obj);
  nextTick(() => {
    inputArr.value[form.attrValueList.length - 1].focus();
  });
};

const onBlur = (row: attrValueObj, index: number) => {
  if (row.valueName.trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值名称不能为空',
    });
    form.attrValueList.splice(index, 1);
    return;
  }
  let repeat = form.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName == row.valueName;
    }
  });
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值名称不能重复',
    });
    form.attrValueList.splice(index, 1);
    return;
  }
  row.flag = false;
};
const toElInput = (row: attrValueObj, index: number) => {
  row.flag = true;
  console.log(inputArr.value, 'inputArr.value');
  nextTick(() => {
    inputArr.value[index].focus();
  });
};
const onDeleteAttrValue = (index: number) => {
  form.attrValueList.splice(index, 1);
};
</script>

<style lang="scss" scoped></style>
