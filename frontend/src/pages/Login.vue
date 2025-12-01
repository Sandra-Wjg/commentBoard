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
import { ElMessage } from "element-plus";
import { loginService } from "../service/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userInfo = reactive({
  username: "",
  password: "",
});

async function onSubmit() {
  const { username, password } = userInfo;
  await loginService(username, password);
  router.push("/");
}
</script>

<style lang="scss" scoped></style>
