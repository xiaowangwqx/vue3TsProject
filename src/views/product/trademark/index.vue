<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary" @click="addTradeMark">
      添加品牌
    </el-button>
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
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTradeMark(scope.row)"
          ></el-button>
          <el-popconfirm
            title="确定要删除吗?"
            @confirm="deleteTradeMark(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="warning" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
        @size-change="getHasTrademark(1)"
        @current-change="getHasTrademark"
      />
    </template>
  </el-card>

  <!-- 添加/编辑品牌 -->
  <el-dialog
    v-model="showDialog"
    :title="tradeMarkForm.id ? '编辑品牌' : '新增品牌'"
    @close="oncancel"
  >
    <el-form
      ref="formRef"
      :model="tradeMarkForm"
      :rules="rules"
      style="width: 80%"
      label-width="100px"
    >
      <el-form-item prop="tmName" label="品牌名称">
        <el-input
          v-model="tradeMarkForm.tmName"
          placeholder="请输入品牌名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="logoUrl" label="品牌Logo">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="tradeMarkForm.logoUrl"
            :src="tradeMarkForm.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="oncancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/tradeMark/index';
import type {
  Records,
  trademarkData,
  trademark,
  addOrUpdateTrademarkResponseData,
} from '@/api/product/tradeMark/type';
import type { UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';

let tableData = ref<Records>([]);
let pageSizes = reactive<number[]>([3, 6, 9, 12, 15]);
let currentPage = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);
let showDialog = ref<boolean>(false);
let tradeMarkForm = reactive<trademark>({
  tmName: '',
  logoUrl: '',
});
let formRef = ref();

// 校验品牌名称
const validatorTmName = (rule: any, value: any, callBack: any) => {
  console.log(rule, value, callBack, 'rule,value,callBack');
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('品牌名称应该长度大于2'));
  }
};
// 校验品牌图片
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  console.log(value, 'validatorLogoUrl value');
  if (value) {
    callBack();
  } else {
    callBack(new Error('请上传品牌图片'));
  }
};

let rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, trigger: 'change', validator: validatorLogoUrl }],
};

onMounted(() => {
  getHasTrademark();
});
const getHasTrademark = async (page = 1) => {
  currentPage.value = page;
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
const addTradeMark = () => {
  showDialog.value = true;
};

const updateTradeMark = (row: any) => {
  // tradeMarkForm.tmName=row.tmName;
  // tradeMarkForm.logoUrl=row.logoUrl;
  // tradeMarkForm.id=row.id;
  // ES6语法 合并对象
  Object.assign(tradeMarkForm, row);
  showDialog.value = true;
};

const deleteTradeMark = async (row: any) => {
  let res = await reqDeleteTrademark(row.id);
  if (res.code == 200) {
    console.log(res, '删除品牌');
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    });
    getHasTrademark(tableData.value.length > 1 ? currentPage.value : currentPage.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    });
  }
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  tradeMarkForm.logoUrl = response.data;
  formRef.value.clearValidate('logoUrl');
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 上传文件格式为jpg|png|gif 4M
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件不能超过4MB',
      });
      return false;
    }
  } else {
    ElMessage.error('上传图片必须是jpg|png|gif');
    return false;
  }
};

const oncancel = () => {
  showDialog.value = false;
  formRef.value.resetFields();
};

const onConfirm = async () => {
  // 表单校验
  await formRef.value.validate();
  let res: addOrUpdateTrademarkResponseData =
    await reqAddOrUpdateTrademark(tradeMarkForm);
  console.log(res, '添加/修改品牌');
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: tradeMarkForm.id ? '编辑品牌成功' : '新增品牌成功',
    });
    getHasTrademark(tradeMarkForm.id ? currentPage.value : 1);
    oncancel();
  } else {
    ElMessage({
      type: 'error',
      message: tradeMarkForm.id ? '编辑品牌失败' : '新增品牌失败',
    });
  }
};

// const handleSizeChange = () => {
//   currentPage.value = 1;
//   getHasTrademark();
// };
// const handleCurrentChange = () => {
//   // currentPage.value = val;
//   getHasTrademark();
// };
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
