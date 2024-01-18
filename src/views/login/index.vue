<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          ref="loginFormRef"
          :rules="rules"
        >
          <h1>hello</h1>
          <h2>欢迎来到vue3</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              v-model="loginForm.password"
              :prefix-icon="Lock"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-btn"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';

// 引入用户相关仓库
import useUserStore from '@/store/modules/user';
import { pa } from 'element-plus/es/locale';

let userStore = useUserStore();
// 获取路由器
let $router = useRouter();
let $route=useRoute();

// 收集登录 账号密码
let loginForm = reactive({ username: 'admin', password: '111111' });
let loading = ref(false);
let loginFormRef = ref();

// 自定义校验规则 校验用户名
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule：数组的校验规则对象
  // value: 表单元素文本内容
  // callback：一个函数 符合条件 通过callback放行通过 不符合条件 注入错误提示信息
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error('账号长度至少5位'));
  }
};

// 自定义校验规则 校验密码
const validatorUserPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error('密码长度至少5位'));
  }
};

let rules = reactive({
  username: [{ trigger: 'change', validator: validatorUserName }],
  password: [{ tirgger: 'change', validator: validatorUserPassword }],
});

// 登录
const login = async () => {
  // 表单校验通过再发起请求
  console.log(loginFormRef, 'loginFormRef');
  let valid = await loginFormRef.value.validate();
  console.log(valid, 'valid');
  // 开始加载
  loading.value = true;
  // 发起登录请求
  try {
    await userStore.userLogin(loginForm);
    // 请求成功 跳转到首页
    let redirct:any=$route?.query?.redirct;
    $router.push({path:redirct||'/'});
    ElNotification({
      type: 'success',
      message: `Hi,${getTime()}好`,
    });
    loading.value = false;
  } catch (err) {
    loading.value = false;
    // 请求失败 弹出对应登录失败信息
    ElNotification({
      type: 'error',
      message: (err as Error).message,
    });
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login-form {
  box-sizing: border-box;
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    color: #fff;
    font-size: 40px;
  }

  h2 {
    color: #fff;
    font-size: 20px;
    margin: 20px 0;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
