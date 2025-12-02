<template>
  <div>
    <el-divider></el-divider>
    <div class="userinfo">
      <el-avatar :size="30" :src="circleUrl"></el-avatar>
      <span class="username">{{ item.username }}</span>
      <span class="time">{{ new Date(item.createdAt).toLocaleString() }}</span>
    </div>
    <p>{{ item.content }}</p>
    <div v-if="item.username === username">
      <el-button type="text" @click="showEditModal = true">编辑</el-button>
      <el-button type="text" style="color: red" @click="del">删除</el-button>
    </div>
    <!-- 编辑留言 -->
    <el-dialog title="编辑留言" v-model="showEditModal" width="50%">
      <el-input type="textarea" :rows="3" v-model="newComment"></el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showEditModal = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { delCommentService, updateCommentService } from "../service/comment";

const emit = defineEmits(["getCommentList"]);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const circleUrl =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
const showEditModal = ref(false);
const newComment = ref(props.item.content);
const username = sessionStorage.getItem("username") || "";

async function del() {
  if (window.confirm("确定删除？")) {
    console.log("删除评论：", props.item._id);
    await delCommentService(props.item._id);
    emit("getCommentList");
  }
}
async function update() {
  console.log("更新评论：", props.item._id, newComment.value);
  showEditModal.value = false;
  await updateCommentService(props.item._id, newComment.value);
  emit("getCommentList");
}
</script>

<style lang="scss" scoped>
.userinfo {
  position: relative;
  left: 0;
  .username {
    position: absolute;
    margin-left: 5px;
    margin-top: 7px;
  }

  .time {
    font-size: 12px;
    color: #666;
    position: absolute;
    right: 0;
  }
}
</style>
