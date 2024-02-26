<script lang="ts" setup name="DemoLogin">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../stores/counter";

// 获取store
const store = userStore();
const router = useRouter();
const loginFormRules = {
  loginName: [{ required: true, message: "不能为空", trigger: "blur" }],
  password: [{ required: true, message: "不能为空", trigger: "blur" }],
};
const formData = reactive({
  loginName: "admin",
  password: "123456",
});

const register = () => {
  router.push("/register");
};

const resetPassword = () => {
  router.push("/resetPassword");
};

const loginForm = ref();
const handleSubmit = () => {
  if (loginForm.value) {
    loginForm.value.validate((valid: boolean) => {
      if (!valid) return;
      store.setLoginUser(formData.loginName);
      sessionStorage.setItem("token", formData.loginName);
      store.loadMenu();
      router.push("/home");
    });
  }
};
</script>

<template>
  <div class="login" @keydown.enter="handleSubmit()">
    <div class="login-bg">
      <div class="login-ctn">
        <el-form ref="loginForm" :model="formData" :rules="loginFormRules" class="login-form" label-position="right" label-width="60px">
          <div class="login-logo">
            <img src="../../images/logo.png" alt="系统管理平台" />
          </div>

          <el-form-item label="账号:" prop="loginName">
            <el-input v-model="formData.loginName" class="input" placeholder="请输入账号" />
          </el-form-item>

          <el-form-item label="密码:" prop="password">
            <el-input v-model="formData.password" type="password" class="input" placeholder="请输入密码" />
          </el-form-item>

          <div class="row-regist">
            <span @click="register()">用户注册</span>
            <span @click="resetPassword()">忘记密码</span>
          </div>
          <div class="row-button">
            <el-button type="primary" class="button" @click="handleSubmit()">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@import "./login.less";
</style>
