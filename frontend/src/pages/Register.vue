<template>
  <div>
    <el-form :model="userInfo" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="userInfo.conformPassword" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="userInfo.age" :min="0" :max="150" />
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="userInfo.city" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.gender">
          <el-radio :value="0">暂时保密</el-radio>
          <el-radio :value="1">女</el-radio>
          <el-radio :value="2">男</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
        <el-button @click="$router.push('/')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const userInfo = reactive({
  username: "",
  password: "",
  conformPassword: "",
  age: 20,
  city: "北京",
  gender: 0,
});

function onSubmit() {
  console.log("登录信息：", userInfo);
  // 在这里添加登录逻辑，例如发送请求到后端进行验证
}
</script>

<style lang="scss" scoped></style>
