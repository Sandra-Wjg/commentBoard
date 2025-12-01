<template>
  <div class="container">
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item>
        <el-input
          v-model="comment"
          style="width: 600px"
          :rows="2"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addComment"> 提交留言 </el-button>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="filterType" @change="changeFilter">
          <el-radio :label="1">看全部</el-radio>
          <el-radio :label="2">只看自己</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div v-for="item in itemList" :key="item._id" style="max-width: 600px">
      <CommentList :item="item" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CommentList from "../components/CommentList.vue";
import {
  createCommentService,
  getCommentListService,
} from "../service/comment";

const filterType = ref(1);
const comment = ref("");

const itemList = ref([
  // 模拟数据
  {
    _id: 1,
    username: "zhangsan",
    content:
      "留言内容A 留言内容A 留言内容A 留言内容A 留言内容A 留言内容A 留言内容A  留言内容A留言内容A 留言内容A 留言内容A 留言内容A 留言内容A",
    createdAt: Date.now(),
  },
  {
    _id: 2,
    username: "lisi",
    content: "留言内容B 留言内容B 留言内容B 留言内容B 留言内容B ",
    createdAt: Date.now() - 5 * 60 * 1000, // 5 分钟以前
  },
  {
    _id: 3,
    username: "wangwu",
    content: "留言内容C 留言内容C 留言内容C 留言内容C 留言内容C ",
    createdAt: Date.now() - 10 * 60 * 1000, // 10 分钟以前
  },
]);

function addComment() {
  console.log("提交评论：", comment.value);
}
function changeFilter() {
  console.log("切换过滤类型：", filterType.value);
}
</script>

<style lang="scss" scoped></style>
