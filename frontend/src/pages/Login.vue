<template>
  <div>
    <el-form :model="userInfo" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const userInfo = reactive({
  username: "",
  password: "",
});

function onSubmit() {
  console.log("登录信息：", userInfo);
  // 在这里添加登录逻辑，例如发送请求到后端进行验证
}
</script>

<style lang="scss" scoped></style>
