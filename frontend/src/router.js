import { createWebHistory, createRouter } from "vue-router";

import CommentView from "./pages/Comment.vue";
import LoginView from "./pages/Login.vue";
import RegisterView from "./pages/Register.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/comment", component: CommentView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
