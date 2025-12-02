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
import { onMounted, ref } from "vue";
import CommentList from "../components/CommentList.vue";
import {
  createCommentService,
  getCommentListService,
} from "../service/comment";

onMounted(async () => {
  await getCommentList();
});

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
]);
async function getCommentList() {
  const data = await getCommentListService(filterType.value);
  if (data && data.length >= 0) {
    itemList.value = data;
  }
}
async function addComment() {
  console.log("提交评论：", comment.value);
  await createCommentService(comment.value);
  await getCommentList();
}
async function changeFilter() {
  console.log("切换过滤类型：", filterType.value);
  await getCommentList();
}
</script>

<style lang="scss" scoped></style>
