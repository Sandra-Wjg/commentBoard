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
      <CommentList :item="item" @getCommentList="getCommentList" />
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

const itemList = ref([]);
async function getCommentList() {
  const data = await getCommentListService(filterType.value);
  if (data && data.length >= 0) {
    itemList.value = data;
  }
}
async function addComment() {
  await createCommentService(comment.value);
  await getCommentList();
  comment.value = "";
}
async function changeFilter() {
  await getCommentList();
}
</script>

<style lang="scss" scoped></style>
